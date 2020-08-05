window.addEventListener("load", (e) => {
  setupRouting();
});

function setupRouting() {
  Router.setup();
  const projecPage = Router.useRoute("project", function () {});
}

// prevent browser refresh url changes
//https://medium.com/js-dojo/how-to-prevent-browser-refresh-url-changes-or-route-navigation-in-vue-132e3f9f96cc
const route = {};
const Router = {
  setup: () => {
    // prevent the browser refreshing
    const captureUnload = (e) => {
      // e.preventDefault();
      // Chrome requires returnValue to be set.
      e.returnValue = "";
    };
    // init the router here
    window.addEventListener("beforeunload", captureUnload);

    return () => {
      // cleanup function
      // init the router here
      window.removeEventLister("beforeunload", captureUnload);
    };
  },
  useRoute: (routeName, callback) => {},
};
