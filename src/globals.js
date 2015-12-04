import util from './util';
import data from './data/index';

var getValues = util.getValues;

class Ticker {
  constructor() {
    this.counter = 0
    this.callbacks = {};
    this.now = Date.now();
  }

  getId() {
    var id = parseInt(Math.random() * Math.pow(10, 9));
    return !this.callbacks[id]
      ? id
      : this.getId();
  }

  onTick(callback, scope) {
    var id = this.getId();
    this.callbacks[id] = callback.bind(scope || this);
    return id;
  }

  update() {
    var now = Date.now();
    var diff = now - this.now;
    var counter = ++this.counter;
    getValues(this.callbacks).forEach(cb => cb(counter, diff));
    this.now = now;
  }

  removeListener(id) {
    delete this.callbacks[id];
  }

  removeAllListeners() {
    this.callbacks = {};
  }
}


function patchInteractionManager(renderer) {
  var me = renderer.plugins.interaction;

  function extendMethod(method, extFn) {
    var old = me[method];
    me[method] = function() {
      extFn.call(me, ...arguments);
      old.call(me, ...arguments);
    }
  }

  // patch addEvents
  function extendAddEvents() {
    this.interactionDOMElement.addEventListener('touchout', this.onTouchOut, true);
  };
  extendMethod('addEvents', extendAddEvents);

  // patch removeEvents
  extendMethod('removeEvents', function() {
    this.interactionDOMElement.removeEventListener('touch')
  });

  // patch destroy
  extendMethod('destroy', function() {
    this.onTouchOut = null;
  });

  // patch update
  extendMethod('update', function() {
    this.processInteractive(this.eventData.data.global, this.renderer._lastObjectRendered, this.processTouchOverOut, true );
  });

  // patch processTouchMove
  extendMethod('processTouchMove', function(displayObject, hit) {
    this.processTouchOverOut(displayObject, hit);
  });

  // create onTouchOut
  me.onTouchOut = function() {
    this.eventData.data.originalEvent = event;
    this.eventData.stopped = false;

    // Update internal reference
    this.mapPositionToPoint( this.eventData.data.global, event.clientX, event.clientY);

    this.interactionDOMElement.style.cursor = 'inherit';

    this.mapPositionToPoint( this.eventData.data.global, event.clientX, event.clientY );

    this.processInteractive( this.eventData.data.global, this.renderer._lastObjectRendered, this.processTouchOverOut, false );
  };

  // create processTouchOverOut
  me.processTouchOverOut = function(displayObject, hit) {
    if(hit)
    {
        if(!displayObject._over)
        {
            displayObject._over = true;
            this.dispatchEvent( displayObject, 'touchover', this.eventData );
        }

        if (displayObject.buttonMode)
        {
            this.cursor = displayObject.defaultCursor;
        }
    }
    else
    {
        if(displayObject._over)
        {
            displayObject._over = false;
            this.dispatchEvent( displayObject, 'touchout', this.eventData);
        }
    }
  };

  // patch constructor
  me.onTouchOut = me.onTouchOut.bind(me);
  me.processTouchOverOut = me.processTouchOverOut.bind(me);
  extendAddEvents.call(me);
};

export default {
  util,
  data,
  patchInteractionManager,
  ticker: new Ticker()
};
