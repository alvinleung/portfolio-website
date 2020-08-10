window.addEventListener("load", (e) => {
  setupPageTransition(".transition-wrapper");
  setupRouting();
});

window.addEventListener("pagedidload", function (e) {
  Router.updateRouter(window.location.href);
});

// ==================
//
// Setup Routing
//
// ==================
function setupRouting() {
  // Example routes
  // index page: ""
  // Helpate Page: "project-helpmate.html"
  Router.useRoute("", function (previousUrl) {
    // index.html
    setupTextAnimation();
  });

  Router.useRoute("project-helpmate.html", function (previousUrl) {
    // helpmate project

    // init the react app
    DesignExplorer.mountAll();
    return function (upcomingUrl) {
      // remove the react app
      DesignExplorer.unmountAll();
    };
  });

  Router.updateRouter(window.location.href);
}

// Example Routing for index page
//
// Router.useRoute("", function (previousUrl) {
//    // index.html
//    console.log("initing index html");
//    console.log("coming from " + previousUrl);

//    return function (upcommingUrl) { // callback function when leaving the route
//      console.log("exiting index html");
//      console.log("going to " +upcommingUrl);
//    };
//  });

// simple router setup
const Router = {
  _routes: {},
  baseDirectory: "dist",
  _currentRoute: "", // base url now, equals to "/index.html" or "/" route
  _prevRoute: {
    route: this._currentRoute,
    cleanUp: function () {},
  },
  useRoute: function (route, callback) {
    this._routes[route] = callback;
  },
  updateRouter: function (toRoute) {
    // step 1 - process routing url

    // https://stackoverflow.com/questions/6263454/get-relative-url-from-absolute-url
    const relativeUrl = toRoute.replace(/^(?:\/\/|[^/]+)*\//, "");
    const processedUrl = this._removeIndexHtmlFromUrl(
      this._removeHashFromUrl(this._removeBaseDirectoryFromURL(relativeUrl))
    );

    // invoke the cleanup function from previous route
    if (typeof this._prevRoute.cleanUp === "function") {
      this._prevRoute.cleanUp(processedUrl);
    }

    // console.log("ROUTER: base relative URL " + relativeUrl);
    // console.log("ROUTER: processed URL " + processedUrl);

    // invoke the setup functio of this route
    const callback = this._routes[processedUrl];

    // invoke the callback for the upcoming page
    if (typeof callback === "function") {
      this._prevRoute.cleanUp = callback(this._prevRoute.route);
    } else {
      this._prevRoute.cleanUp = function () {}; // empty cleanup function if the function is niot there
    }
    this._prevRoute.route = processedUrl;
  },
  _removeBaseDirectoryFromURL: function (url) {
    return url.replace(this.baseDirectory + "/", "");
  },

  _removeHashFromUrl: function (url) {
    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) return url.substr(0, hashIndex);
    // # character found in url
    else return url;
  },

  _removeIndexHtmlFromUrl: function (url) {
    const indexHTMLIndex = url.indexOf("index.html");
    if (indexHTMLIndex !== -1) return url.substr(0, indexHTMLIndex);
    // # character found in url
    else return url;
  },

  getRelativePath: function (url) {
    return url.replace(/^(?:\/\/|[^/]+)*\//, "");
  },
  cleanResourcePath: function (url) {
    return this._removeIndexHtmlFromUrl(
      this._removeHashFromUrl(this._removeBaseDirectoryFromURL(url))
    );
  },
};

function setupPageTransition(transitionContainerSelector) {
  // grab all the links
  const allLinks = document.querySelectorAll("a");
  const currentPageUrl = window.location.href;

  const cleanupCaptureLinks = captureLinkClicks(allLinks, (url) => {
    transitionToPage(currentPageUrl, url);
  });

  const pageBackEventHandler = (e) => {
    e.preventDefault();

    // when the user go back
    // trigger transition to the page
    transitionToPage(currentPageUrl, window.location.href);
  };

  function cleanUpPageChangeEventListeners() {
    // clean up
    window.removeEventListener("popstate", pageBackEventHandler, true);
    // remove all event listener for capturing link clicks
    cleanupCaptureLinks();
  }

  // handle page go back
  window.addEventListener("popstate", pageBackEventHandler, true);

  // only responsible for managing the transition
  function transitionToPage(fromUrl, toUrl) {
    // clean up page change event listenere
    cleanUpPageChangeEventListeners();

    const transitionContainer = document.querySelector(
      transitionContainerSelector
    );
    const transitionContainerParent = transitionContainer.parentElement;

    // recenter the page transition
    recenterTransformOrigin(transitionContainer);

    // apply the animation
    transitionContainer.classList.add("transition-wrapper--exiting");
    transitionContainer.addEventListener("animationend", function (e) {
      // remove the element after animation end
      transitionContainerParent.removeChild(this);
    });

    // load that page
    fetch(toUrl)
      .then((response) => {
        console.log("Loading page: " + toUrl);
        console.log("Status: " + response.statusText);

        if (response.status !== 200) {
          throw "Could not fetch page";
        }

        return response.text();
      })
      .then((html) => {
        // parse the html
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        // grab the main content
        const mainContent = doc.querySelector(transitionContainerSelector);

        firePageUnloadEvent(fromUrl, toUrl);

        // apply animation to the main content class
        mainContent.classList.add("transition-wrapper--entering");
        mainContent.classList.add("transition-wrapper");
        recenterTransformOrigin(mainContent);

        // When the page entering animation FINISH
        const enterAnimationEndHandler = (e) => {
          // console.log("Animation Finished: " + e.animationName);

          // remove the animation class after finish the animation
          mainContent.classList.remove("transition-wrapper--entering");

          // CLEAN UP: remove this event listener after fired
          mainContent.removeEventListener(
            "animationend",
            enterAnimationEndHandler
          );

          // to trigger the refresh of page link
          firePageLoadEvent(fromUrl, toUrl);
          // prepare page transition links for next clink click
          setupPageTransition(transitionContainerSelector);
        };

        mainContent.addEventListener("animationend", enterAnimationEndHandler);

        transitionContainerParent.appendChild(mainContent);
      });
  }
}

function firePageLoadEvent(fromUrl, toUrl) {
  const pageLoadEvent = new CustomEvent("pagedidload", {
    detail: { fromUrl: fromUrl, toUrl: toUrl },
  });
  window.dispatchEvent(pageLoadEvent);
}

function firePageUnloadEvent(fromUrl, toUrl) {
  const firePageUnloadEvent = new CustomEvent("pagewillunload", {
    detail: { fromUrl: fromUrl, toUrl: toUrl },
  });
  window.dispatchEvent(firePageUnloadEvent);
}

function captureLinkClicks(allLinks, callback) {
  const currentPageLocation = window.location.href; // current page full URL

  const cleanupEventListener = function () {
    allLinks.forEach((elm) => {
      elm.removeEventListener("click", clickCaptureHandler, true); // remove event listener is working
    });
  };
  const clickCaptureHandler = function (e) {
    // prevent browser from loading that page
    e.preventDefault();
    console.log("User Clicked on link " + this.href);

    const linkTarget = this.href;
    // console.log(Router.getRelativePath(window.location.href));
    // console.log(Router.getRelativePath(linkTarget));
    if (
      Router.getRelativePath(linkTarget) ===
      Router.getRelativePath(window.location.href)
    ) {
      return;
    }

    // write the page change into history
    history.pushState(null, null, linkTarget);

    cleanupEventListener();

    // call back
    callback(linkTarget);
  };

  allLinks.forEach((elm) => {
    // only capture links that leads to other pages
    if (!elm.href) return;
    //if (elm.href === currentPageLocation) return; // link to this particular page, return
    if (
      Router.cleanResourcePath(Router.getRelativePath(elm.href)) ===
      Router.cleanResourcePath(Router.getRelativePath(window.location.href))
    ) {
      return; // link that refrencing current page "#", return
    }
    // capture all the links
    elm.addEventListener("click", clickCaptureHandler, true);
  });

  return cleanupEventListener;
}

// ============================================
//
// code for animating text on landing
//
// ============================================
function setupTextAnimation() {
  // text slide in animation on landing
  const elm = document.querySelector(".hero__headline");

  if (!elm) {
    console.log("Text animation aborted, .hero__headline not found");
    return;
  }

  // split each word
  const words = elm.innerHTML.split(" "); // split each word by space

  // clear the html first
  elm.innerHTML = "";

  words.forEach((str, index) => {
    // create elm for each class first
    const containerSpan = document.createElement("span");
    const wordSpan = document.createElement("span");

    // create a span that contain a trailing space character
    wordSpan.innerText = str + " ";
    wordSpan.style.animationDelay = index * 100 + "ms";

    containerSpan.appendChild(wordSpan);
    elm.appendChild(containerSpan);
  });

  elm.classList.add("hero__headline--animation");
}
// ============================================
//
// Center transform origin to scren
//
// ============================================
function recenterTransformOrigin(elm) {
  const currentScrollPos = window.pageYOffset + window.innerHeight / 2;
  elm.style.transformOrigin = `center ${currentScrollPos}px`;
}
