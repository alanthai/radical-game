"use strict";

var config = (function () {
  "use strict";

  var IMG_PATH = "img";

  return {
    wordpartSet: {
      center: [200, 200],
      radius: 150 // pixel
    },

    wordpart: {
      active: "" + IMG_PATH + "/circle-active.png",
      inactive: "" + IMG_PATH + "/circle-inactive.png",
      text: function (radical) {
        return "" + IMG_PATH + "/radicals/" + radical + ".png";
      }
    } };
})();