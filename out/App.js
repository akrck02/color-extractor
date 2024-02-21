(function () {
    'use strict';

    class SignalBuffer {
        static add(signal) {
            this.signals.push(signal);
        }
        static remove(signal) {
            this.signals = this.signals.filter((sig) => sig !== signal);
        }
        static search(id) {
            return this.signals.find((sig) => sig.id === id);
        }
    }
    SignalBuffer.signals = [];

    class InitializeError extends Error {
        constructor(m) {
            super(m);
            // Set the prototype explicitly.
            Object.setPrototypeOf(this, InitializeError.prototype);
        }
    }

    class DOM {
        /**
         * Set HTML attributes to the given element.
         * @param element Element to set attributes
         * @param attributes Attributes to set
         * @returns The element with attributes in order to chain methods
         */
        static setAttributes(element, attributes) {
            if (!attributes)
                return element;
            for (const key in attributes)
                element.setAttribute(key, attributes[key]);
            return element;
        }
        /**
         * Remove the HTML attributes to the given component.
         * @param element The element to remove attributes
         * @param attributes list of data attributes to be removed
         * @returns DOM element in order to chain methods
         */
        static removeAttributes(element, attributes) {
            if (!attributes)
                return element;
            attributes.forEach((attr) => element.removeAttribute(attr));
            return element;
        }
        /**
         * Set the classes to the given component.
         * @param element element to set classes to
         * @param classes list of classes to be set
         * @returns DOM element in order to chain methods
         */
        static setClasses(element, classes) {
            if (!classes)
                return element;
            classes.forEach((cl) => element.classList.add(cl));
            return element;
        }
        /**
         * Remove the classes to the given component.
         * @param element element to remove classes to
         * @param classes list of classes to be removed
         * @returns DOM element in order to chain methods
         */
        static removeClasses(element, classes) {
            if (!classes)
                return element;
            classes.forEach((cl) => element.classList.remove(cl));
            return element;
        }
        /**
         * Set the styles to the given component.
         * @param element element to set styles to
         * @param styles Object with style names and values
         * @returns DOM element with classes in order to chain methods
         */
        static setStyles(element, styles) {
            if (!styles)
                return element;
            for (const key in styles)
                element.style[key] = styles[key];
            return element;
        }
        /**
         * Remove the classes to the given component.
         * @param element element to remove styles to
         * @param styles List of styles to be removed
         * @returns DOM element with classes in order to chain methods
         */
        static removeStyles(element, styles) {
            if (!styles)
                return element;
            styles.forEach((style) => element.style.removeProperty(style));
            return element;
        }
        /**
         * Set the events to the given component.
         * @param element element to set events to
         * @param events Object with events and listener functions
         * @returns DOM element with classes in order to chain methods
         */
        static setEvents(element, events) {
            if (!events)
                return element;
            for (const key in events)
                element.addEventListener(key, events[key]);
            return element;
        }
        /**
         * Remove the events to the given component.
         * @param element element to remove events to
         * @param events List of events to be removed
         * @returns DOM element with classes in order to chain methods
         */
        static removeEvents(element, events) {
            if (!events)
                return element;
            for (const key in events)
                element.removeEventListener(key, events[key]);
            return element;
        }
        /**
         * Set the HTML data attributes to the given component.
         * @param element element to set data attributes
         * @param dataset Object with data attributes and values
         * @returns DOM element with data attributes in order to chain methods
         */
        static setDataset(element, dataset) {
            if (!dataset)
                return element;
            for (const key in dataset)
                element.dataset[key] = dataset[key];
            return element;
        }
        /**
         * Remove the HTML data attributes to the given component.
         * @param element element to set data attributes
         * @param dataset Object with data attributes and values
         * @returns DOM element with data attributes in order to chain methods
         */
        static removeDataset(element, dataset) {
            if (!dataset)
                return element;
            dataset.forEach((data) => delete element.dataset[data]);
            return element;
        }
        /**
         * Remove all the NODEs matching the selector
         * @param selector a query selector to find the elements
         * @returns Promise with the number of elements removed
         * @example
         *    const removed = await UIComponent.removeAll("div");
         *    console.log(`removed ${removed} elements`);
         */
        static async removeAll(selector) {
            const comps = document.querySelectorAll(selector);
            if (!comps)
                return new Promise((resolve, reject) => reject(0));
            let count = 0;
            comps.forEach((comp) => {
                comp.parentNode.removeChild(comp);
                count++;
            });
            return new Promise((resolve) => resolve(count));
        }
        /**
         * Execute a function for each element matching the selector
         * @param selector a query selector to match the node to remove
         * @param funct Function to execute for each element
         * @returns a promise representing if the node was removed
         */
        static async forAll(selector, funct) {
            const comps = document.querySelectorAll(selector);
            if (!comps)
                return new Promise((resolve, reject) => reject("No element found"));
            for (let i = 0; i < comps.length; i++) {
                const comp = comps[i];
                await funct(comp);
            }
            return new Promise((resolve) => resolve());
        }
        /**
         * Remove the component matching the given component.
         * @param selector a query selector to match the node to remove
         * @returns a promise representing if the node was removed
         * @example
         *   const removed = await UIComponent.remove("div");
         *   console.log(`removed ${removed} elements`);
         */
        static async remove(selector) {
            const comp = document.querySelector(selector);
            if (comp == null)
                return new Promise((resolve, reject) => reject("No element found"));
            comp.parentNode.removeChild(comp);
            return new Promise((resolve) => resolve(1));
        }
    }
    var HTML;
    (function (HTML) {
        HTML["VIEW"] = "view";
        HTML["DIV"] = "div";
        HTML["SPAN"] = "span";
        HTML["INPUT"] = "input";
        HTML["BUTTON"] = "button";
        HTML["TEXTAREA"] = "textarea";
        HTML["SELECT"] = "select";
        HTML["OPTION"] = "option";
        HTML["FORM"] = "form";
        HTML["LABEL"] = "label";
        HTML["IMG"] = "img";
        HTML["A"] = "a";
        HTML["TABLE"] = "table";
        HTML["THEAD"] = "thead";
        HTML["TBODY"] = "tbody";
        HTML["TR"] = "tr";
        HTML["TH"] = "th";
        HTML["TD"] = "td";
        HTML["I"] = "i";
        HTML["UL"] = "ul";
        HTML["LI"] = "li";
        HTML["NAV"] = "nav";
        HTML["HEADER"] = "header";
        HTML["FOOTER"] = "footer";
        HTML["SECTION"] = "section";
        HTML["ARTICLE"] = "article";
        HTML["ASIDE"] = "aside";
        HTML["H1"] = "h1";
        HTML["H2"] = "h2";
        HTML["H3"] = "h3";
        HTML["H4"] = "h4";
        HTML["H5"] = "h5";
        HTML["H6"] = "h6";
        HTML["P"] = "p";
        HTML["HR"] = "hr";
        HTML["BR"] = "br";
        HTML["CANVAS"] = "canvas";
        HTML["SVG"] = "svg";
        HTML["PATH"] = "path";
        HTML["POLYGON"] = "polygon";
        HTML["POLYLINE"] = "polyline";
        HTML["CIRCLE"] = "circle";
        HTML["ELLIPSE"] = "ellipse";
        HTML["RECT"] = "rect";
        HTML["LINE"] = "line";
        HTML["TEXT"] = "text";
        HTML["TSPAN"] = "tspan";
        HTML["G"] = "g";
        HTML["MASK"] = "mask";
        HTML["PATTERN"] = "pattern";
        HTML["DEFS"] = "defs";
        HTML["SYMBOL"] = "symbol";
        HTML["USE"] = "use";
        HTML["CLIPPATH"] = "clipPath";
        HTML["STOP"] = "stop";
        HTML["LINEARGRADIENT"] = "linearGradient";
        HTML["RADIALGRADIENT"] = "radialGradient";
        HTML["FILTER"] = "filter";
        HTML["FEIMAGE"] = "feImage";
        HTML["FEMERGE"] = "feMerge";
        HTML["FEMERGENODE"] = "feMergeNode";
        HTML["FEGAUSSIANBLUR"] = "feGaussianBlur";
        HTML["FEOFFSET"] = "feOffset";
        HTML["FEDISPLACEMAP"] = "feDisplacementMap";
        HTML["FEPOINTLIGHT"] = "fePointLight";
        HTML["FESPOTLIGHT"] = "feSpotLight";
        HTML["FEDIFFUSELIGHTING"] = "feDiffuseLighting";
        HTML["FETURBULENCE"] = "feTurbulence";
        HTML["FECONVOLVEMATRIX"] = "feConvolveMatrix";
        HTML["FECOMPOSITE"] = "feComposite";
        HTML["FEFLOOD"] = "feFlood";
        HTML["FEMORPHOLOGY"] = "feMorphology";
        HTML["FEDISTANTLIGHT"] = "feDistantLight";
        HTML["FEDROPSHADOW"] = "feDropShadow";
        HTML["FEFUNCOLORMATRIX"] = "feFuncColorMatrix";
        HTML["FEFUNCA"] = "feFuncA";
        HTML["FEFUNCRGB"] = "feFuncR";
        HTML["FEFUNCG"] = "feFuncG";
        HTML["FEFUNCB"] = "feFuncB";
        HTML["FECONVOLVE"] = "feConvolve";
        HTML["FEMATRIX"] = "feMatrix";
        HTML["FESPECULARLIGHTING"] = "feSpecularLighting";
        HTML["FEPOINTLIGHTELEMENT"] = "fePointLightElement";
        HTML["FESPOTLIGHTELEMENT"] = "feSpotLightElement";
        HTML["FEDISTANTLIGHTELEMENT"] = "feDistantLightElement";
        HTML["FEFLOODELEMENT"] = "feFloodElement";
        HTML["FEGAUSSIANBLURELEMENT"] = "feGaussianBlurElement";
        HTML["FEMORPHOLOGYELEMENT"] = "feMorphologyElement";
        HTML["FEDROPSHADOWELEMENT"] = "feDropShadowElement";
        HTML["FETURBULENCEELEMENT"] = "feTurbulenceElement";
    })(HTML || (HTML = {}));

    /**
     * Class representing a UI component (HTML element) with custom properties and methods.
     * @description This class is a base class for all UI components.
     * @class UIComponent
     */
    class UIComponent {
        constructor(props) {
            this.type = props.type ?? "div";
            this.text = props.text;
            this.id = props.id;
            this.classes = props.classes;
            this.attributes = props.attributes;
            this.styles = props.styles;
            this.data = props.data;
            this.events = props.events;
            this.element = this.createElement();
        }
        createElement() {
            let element;
            if (!this.type) {
                throw "Element without type.";
            }
            element = document.createElement(this.type);
            if (this.text) {
                element.innerHTML = this.text;
            }
            if (this.id) {
                element.id = this.id;
            }
            if (this.classes) {
                DOM.setClasses(element, this.classes);
            }
            if (this.attributes) {
                DOM.setAttributes(element, this.attributes);
            }
            if (this.styles) {
                DOM.setStyles(element, this.styles);
            }
            if (this.data) {
                DOM.setDataset(element, this.data);
            }
            if (this.events) {
                DOM.setEvents(element, this.events);
            }
            return element;
        }
        /**
         * Get the HTML code of the component.
         * @returns The HTML code of the component
         */
        toHTML() {
            return this.element.outerHTML;
        }
        /**
         * Appends a child to the component.
         * @param child  Child component to be added
         * @returns      The component itself (for chaining)
         */
        appendChild(child) {
            this.element.appendChild(child instanceof UIComponent ? child.element : child);
            return this;
        }
        /**
         * removes a child from the component.
         * @param child  Child component to be removed
         * @returns      The component itself (for chaining)
         * @description  If the child is not a child of the component, a message appears.
         */
        removeChild(child) {
            try {
                this.element.removeChild(child instanceof UIComponent ? child.element : child);
            }
            catch (e) {
                console.log(child, "is not a child of", this.element);
            }
            return this;
        }
        /**
         * append this component to a parent component.
         * @param parent Parent component to be appended to
         * @returns      The component itself (for chaining)
         */
        appendTo(parent) {
            parent.appendChild(this.element);
            return this;
        }
        /**
         * Clears the component.
         * @returns The component itself (for chaining)
         */
        clean() {
            this.element.innerHTML = "";
            return this;
        }
        /**
         * Get the value of the component.
         * @returns The value of the component
         */
        getValue() {
            if (this.element instanceof HTMLInputElement) {
                return this.element.value;
            }
            return this.element.innerHTML;
        }
        /**
         * Set the attributes to the given component.
         * @param options Object with attributes and values
         * @returns UIComponent in order to chain methods
         */
        setAttributes(options) {
            this.element = DOM.setAttributes(this.element, options);
            return this;
        }
        /**
         * Remove the attributes to the given component.
         * @param options list of atributtes to be removed
         * @returns UIComponent in order to chain methods
         * @example
         *  mycomponent.removeAttributes(["id", "alt"]);
         */
        removeAttributes(options) {
            this.element = DOM.removeAttributes(this.element, options);
            return this;
        }
        /**
         * Set the HTML data attributes to the given component.
         * @param dataset Object with data attributes and values
         * @returns UIComponent in order to chain methods
         * @example
         *    mycomponent.setDataset({
         *       "id": "1",
         *      "name": "John"
         *   });
         */
        setDataset(dataset) {
            this.element = DOM.setDataset(this.element, dataset);
            return this;
        }
        /**
         * Remove the HTML data attributes to the given component.
         * @param dataset list of data attributes to be removed
         * @returns UIComponent with data attributes in order to chain methods
         * @example
         *   mycomponent.removeDataset(["id", "name"]);
         */
        removeDataset(dataset) {
            this.element = DOM.removeDataset(this.element, dataset);
            return this;
        }
        /**
         * Set the events to the given component.
         * @param events Object with events and listener functions
         * @returns UIComponent in order to chain methods
         * @example
         *    mycomponent.setEvents({
         *         "click": () => console.log("Clicked!")
         *    });
         */
        setEvents(events) {
            this.element = DOM.setEvents(this.element, events);
            return this;
        }
        /**
         * Remove the events to the given component.
         * @param events list of events to be removed
         * @returns UIComponent in order to chain methods
         * @example mycomponent.removeEvents(["click"]);
         */
        removeEvents(events) {
            this.element = DOM.removeEvents(this.element, events);
            return this;
        }
        /**
         * Set the classes to the given component.
         * @param styles Object with styles and values
         * @returns UIComponent in order to chain methods
         * @example
         * mycomponent.setStyles({
         *     "color": "red",
         *    "font-size": "12px"
         * });
         */
        setStyles(styles) {
            this.element = DOM.setStyles(this.element, styles);
            return this;
        }
        /**
         * Remove the styles to the given component.
         * @param styles list of styles to be removed
         * @returns UIComponent in order to chain methods
         * @example
         * mycomponent.removeStyles(["color", "font-size"]);
         */
        removeStyles(styles) {
            this.element = DOM.removeStyles(this.element, styles);
            return this;
        }
        /**
         * Set the classes to the given component.
         * @param classes List of classes to be added
         * @returns UIComponent in order to chain methods
         * @example mycomponent.setClasses(["class1", "class2"]);
         */
        setClasses(classes) {
            this.element = DOM.setClasses(this.element, classes);
            return this;
        }
        /**
         * Remove the classes to the given component.
         * @param classes List of classes to be removed
         * @returns UIComponent in order to chain methods
         * @example mycomponent.removeClasses(["class1", "class2"]);
         */
        removeClasses(classes) {
            this.element = DOM.removeClasses(this.element, classes);
            return this;
        }
        /**
         * Remove the component matching the given component.
         * @param selector a query selector to match the node to remove
         * @returns a promise representing if the node was removed
         * @example mycomponent.remove(".mycomponentclass");
         */
        remove(selector) {
            this.element.parentNode.removeChild(this.element);
            return this;
        }
    }

    const Language = {
        ENGLISH: "en",
        SPANISH: "es",
    };
    /**
     * Get the language given a locale
     * or the first occurrence if nothing was found
     * @param locale The locale to search for
     * @returns A language for the locale
     */
    function getLanguage(locale) {
        if (!locale) {
            return Language.ENGLISH;
        }
        const keys = Object.keys(Language);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (locale.includes(Language[key])) {
                return Language[key];
            }
        }
        return Language[keys[0]];
    }

    class URLs {
        /**
         * Get parameters of a url by breakpoint
         * @param url url to get parameters from
         * @param breakpoint breakpoint to get parameters from
         * @description This method is useful for getting parameters of a url by breakpoint.
         * @returns parameters of a url
         * @example
         *     const url = "https://www.website.org/search/user/1/page/2";
         *     const breakpoint = "search";
         *     const parameters = getParametersByBreakPoint(url, breakpoint);
         *     console.log(parameters); // ["user","1","page","2"]
         */
        static getParametersByBreakPoint(url, breakpoint) {
            let params = url.split("/");
            const index = params.indexOf(breakpoint);
            if (index == -1)
                return [];
            params = params.slice(index, params.length);
            return params;
        }
        ;
        /**
         * Get parameters of a url by index
         * @param url url to get parameters from
         * @param index index to get parameters from
         * @description This method is useful for getting parameters of a url by index.
         * @returns parameters of a url
         * @example
         *      const url = "https://www.website.org/search/user/1/page/2";
         *      const index = 1;
         *      const parameters = getParametersByIndex(url, index);
         *      console.log(parameters); // ["1","page","2"]
         */
        static getParametersByIndex(url, index) {
            let params = url.split("/");
            params = params.slice(index, params.length);
            return params;
        }
        ;
        /**
         * Download a file from a url on the client
         * @param url url of the file
         * @param filename name of the file
         * @description This method is useful for downloading a file from a url on the client.
         * @example
         *     const url = "https://www.website.org/search/files/17293.jpg";
         *     const filename = "cat.jpg";
         *     downloadFile(url, filename);
         */
        static downloadFile(uri, name) {
            let link = document.createElement("a");
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        /**
         * Get url GET parameters
         * @param url url to get parameters from
         * @description This method is useful for getting parameters of a url.
         * @returns parameters of a url
         * @example
         *    const url = "https://www.website.org?search=&user=akrck02&page=2";
         *    const parameters = getUrlGetParameters(url);
         *    console.log(parameters); // {search: "", user: "akrck02", page: "2"}
         */
        static getUrlGetParameters(url) {
            let params = url.split("?");
            if (params.length < 2)
                return {};
            params = params[1].split("&");
            let result = {};
            params.forEach((param) => {
                let paramArray = param.split("=");
                result[paramArray[0]] = paramArray[1];
            });
            return result;
        }
        /**
         * Get url GET parameter
         * @param url url to get parameter from
         * @returns parameter of a url
         */
        static addSlash(url) {
            if (url[url.length - 1] != "/") {
                url += "/";
            }
            return url;
        }
        /**
         * Get url GET parameter
         * @param url url to get parameter from
         * @returns parameter of a url
         */
        static addStartSlash(url) {
            if (url[0] != "/") {
                url = "/" + url;
            }
            return url;
        }
    }

    /**
     * Environment states
     */
    var ENVIRONMENT;
    (function (ENVIRONMENT) {
        ENVIRONMENT["DEVELOPMENT"] = "development";
        ENVIRONMENT["PRODUCTION"] = "production";
    })(ENVIRONMENT || (ENVIRONMENT = {}));
    /**
     * Configuration for the application
     */
    class Configuration {
        constructor() {
            this.CONFIG_FILE = "../gtdf.config.json";
            this.Variables = {
                animations: true,
                environment: ENVIRONMENT.DEVELOPMENT,
                language: Language.ENGLISH,
                github_url: ""
            };
            this.Base = {
                app_name: "",
                app_version: "",
                host: "",
                port: 80,
                environment: ENVIRONMENT.DEVELOPMENT,
                debug: false,
                log_level: "",
                website: "",
                author: ""
            };
            this.Path = {
                url: "",
                app: "",
                resources: "",
                language: "",
                images: "",
                icons: ""
            };
            this.Views = {
                url: "",
                home: "",
                income: "",
                error: "",
                blank: ""
            };
            this.Api = {};
        }
        async update() {
            const config = await fetch(this.CONFIG_FILE).then((response) => response.json());
            this.Variables = config.variables;
            this.Base = config.base;
            this.Path = config.path;
            this.Views = config.views;
            this.Api = config.api;
            for (const key in this.Path) {
                if (key == "url") {
                    this.Path[key] = URLs.addSlash(this.Path[key]);
                    continue;
                }
                this.Path[key] = this.Path.url + URLs.addSlash(this.Path[key]);
            }
            for (const key in this.Views) {
                this.Views[key];
                if (key == "url") {
                    this.Views[key] = URLs.addStartSlash(this.Views[key]);
                    this.Views[key] = URLs.addSlash(this.Views[key]);
                    continue;
                }
                this.Views[key] = this.Views.url + URLs.addSlash(this.Views[key]);
            }
            for (const key in this.Api) {
                this.Api[key];
                if (key == "url") {
                    this.Api[key] = URLs.addSlash(this.Api[key]);
                    continue;
                }
                this.Api[key] = this.Api.url + URLs.addSlash(this.Api[key]);
            }
            await this.setDefaultVariables();
        }
        /**
         * Get a configuration instance
         */
        static get instance() {
            if (!this._instance) {
                this._instance = new Configuration();
            }
            return this._instance;
        }
        /**
         * Set default configurations for the application
         */
        async setDefaultVariables() {
            if (this.getConfigVariable(Configuration.ANIMATION_KEY) == undefined) {
                this.setAnimations(true);
            }
            if (this.getConfigVariable(Configuration.LANGUAGE_KEY) == undefined) {
                this.setLanguage(getLanguage(navigator.language));
            }
        }
        /**
         * Get application configurations
         * @returns the application configurations
         */
        getConfig() {
            let localStorageConfiguration = JSON.parse(localStorage.getItem(this.Base.app_name + "-config"));
            if (!localStorageConfiguration) {
                localStorageConfiguration = {};
            }
            return localStorageConfiguration;
        }
        isLogged() {
            return this.getConfigVariable("auth-token") != undefined;
        }
        /**
         * Add a configuration variable
         * @param key the name of the variable
         * @param value the value of the variable
         */
        setConfigVariable(key, value) {
            let localStorageConfiguration = this.getConfig();
            const config = localStorageConfiguration;
            config[key] = value;
            localStorage.setItem(this.Base.app_name + "-config", JSON.stringify(config));
        }
        /**
         * Get a configuration variable
         * @param key the name of the variable
         * @returns the value of the variable
         */
        getConfigVariable(key) {
            let localStorageConfiguration = this.getConfig();
            return localStorageConfiguration[key];
        }
        /**
         * Set animation for application on|off
         * @param on The boolean to set animations
         */
        setAnimations(on) {
            this.setConfigVariable(Configuration.ANIMATION_KEY, on);
        }
        /**
         * Get if animations are enabled
         * @returns if animations are enabled
         */
        areAnimationsEnabled() {
            return this.getConfigVariable(Configuration.ANIMATION_KEY) === "true";
        }
        /**
         * Set the application language
         */
        setLanguage(lang) {
            this.setConfigVariable(Configuration.LANGUAGE_KEY, lang);
        }
        /**
         * Get the current app language
         * @returns The app language
         */
        getLanguage() {
            return getLanguage(this.getConfigVariable(Configuration.LANGUAGE_KEY));
        }
        /**
         * Set the title of the page
         * @param title The title of the page
         */
        setTitle(title) {
            document.title = title;
            window.history.pushState({}, title, window.location.href);
        }
    }
    Configuration.ANIMATION_KEY = "animations";
    Configuration.LANGUAGE_KEY = "language";
    const Config = Configuration.instance;

    const Errors = {
        200: {
            code: 200,
            message: 'Success',
            friendly: 'Success',
            description: 'The operation succeded.'
        },
        400: {
            code: 400,
            message: 'Bad request',
            friendly: 'The request is not valid',
            description: 'The parameters may be wrong or missing.'
        },
        401: {
            code: 401,
            message: 'Unauthorized',
            friendly: 'You have no permissions to access this content 🔐',
            description: 'The content is protected, contact the administrator to get access.'
        },
        404: {
            code: 404,
            message: 'Not found',
            friendly: 'We can\'t find the page you are looking for 😓',
            description: 'The page you\'re searching for is no longer available.'
        },
        500: {
            code: 500,
            message: 'Internal server error',
            friendly: 'Ups, something went wrong 😓',
            description: 'The server is experimenting an unexpected error, contact the administrator for more information.'
        },
    };
    /**
     * Returns the error corresponding to the given code
     * @param code The code of the error
     * @returns The corresponding error by code
     */
    function getErrorByCode(code) {
        return Errors[code];
    }

    const Routes = [];
    function Route(value) {
        return function (target) {
            console.debug(`Route registered /${value}`);
            target.instance().routes = value;
            Routes.push(target.instance());
        };
    }

    function Singleton() {
        return function (target) {
            console.debug(`Singleton instanciated: ${target.name}`);
            target.instance = () => {
                if (!target._instance) {
                    target._instance = new target();
                }
                return target._instance;
            };
            target.instance();
        };
    }

    /* class decorator */
    function StaticImplements() {
        return (constructor) => { };
    }

    var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$4 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    let ViewUI = class ViewUI extends UIComponent {
        constructor(details) {
            super(details);
            this.routes = [];
        }
        static instance() {
            return this._instance;
        }
        isPointing(name) {
            return this.routes.includes(name);
        }
    };
    ViewUI = __decorate$4([
        StaticImplements(),
        __metadata$4("design:paramtypes", [Object])
    ], ViewUI);

    var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$3 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var ErrorView_1;
    let ErrorView = ErrorView_1 = class ErrorView extends ViewUI {
        constructor() {
            super({
                type: "view",
                id: ErrorView_1.ID,
                classes: ["box-column", "box-center"],
            });
        }
        show(params, container) {
            this.clean();
            const code = parseInt(params[0]);
            let error = getErrorByCode(code);
            // Default error set if no error parameter was given
            if (!error) {
                error = getErrorByCode(ErrorView_1.DEFAULT_ERROR_CODE);
            }
            // Image
            const image = new UIComponent({
                type: "img",
                id: ErrorView_1.IMAGE_ID,
                attributes: {
                    src: Config.Path.icons + "error.svg",
                },
            });
            this.appendChild(image);
            // Error title
            const title = new UIComponent({
                type: "h1",
                id: ErrorView_1.TITLE_ID,
                text: error.friendly,
            });
            this.appendChild(title);
            // Error description
            const description = new UIComponent({
                type: "p",
                text: error.description
            });
            this.appendChild(description);
            this.appendTo(container);
        }
    };
    ErrorView.DEFAULT_ERROR_CODE = 404;
    ErrorView.ID = "error";
    ErrorView.IMAGE_ID = "error-img";
    ErrorView.TITLE_ID = "error-title";
    ErrorView = ErrorView_1 = __decorate$3([
        Route("error"),
        Singleton(),
        __metadata$3("design:paramtypes", [])
    ], ErrorView);
    var ErrorView$1 = ErrorView;

    class Signal {
        constructor(id) {
            this.id = id;
            this.subscribers = [];
            this.content = {};
        }
        subscribe(observer) {
            this.subscribers.push(observer);
        }
        unsubscribe(observer) {
            this.subscribers = this.subscribers.filter((obs) => obs !== observer);
        }
        async notify() {
            for (let observer of this.subscribers) {
                try {
                    await observer.update(this.content);
                }
                catch (e) {
                    console.error(`Error notifying observer on signal ${this.id}`, e);
                }
            }
        }
        async emit(data) {
            this.content = data;
            await this.notify();
        }
    }

    var HTTPS_METHOD;
    (function (HTTPS_METHOD) {
        HTTPS_METHOD["GET"] = "GET";
        HTTPS_METHOD["POST"] = "POST";
        HTTPS_METHOD["PUT"] = "PUT";
        HTTPS_METHOD["DELETE"] = "DELETE";
        HTTPS_METHOD["UPDATE"] = "UPDATE";
        HTTPS_METHOD["PATCH"] = "PATCH";
        HTTPS_METHOD["HEAD"] = "HEAD";
        HTTPS_METHOD["OPTIONS"] = "OPTIONS";
        HTTPS_METHOD["CONNECT"] = "CONNECT";
        HTTPS_METHOD["TRACE"] = "TRACE";
        HTTPS_METHOD["ALL"] = "ALL";
    })(HTTPS_METHOD || (HTTPS_METHOD = {}));
    var MIME_TYPE;
    (function (MIME_TYPE) {
        MIME_TYPE["JSON"] = "application/json";
        MIME_TYPE["XML"] = "application/xml";
        MIME_TYPE["HTML"] = "text/html";
        MIME_TYPE["TEXT"] = "text/plain";
        MIME_TYPE["FORM"] = "multipart/form-data";
        MIME_TYPE["URL_ENCODED"] = "application/x-www-form-urlencoded";
        MIME_TYPE["BLOB"] = "application/octet-stream";
        MIME_TYPE["PDF"] = "application/pdf";
        MIME_TYPE["ZIP"] = "application/zip";
        MIME_TYPE["MP3"] = "audio/mpeg";
        MIME_TYPE["MP4"] = "video/mp4";
        MIME_TYPE["PNG"] = "image/png";
        MIME_TYPE["JPEG"] = "image/jpeg";
        MIME_TYPE["GIF"] = "image/gif";
        MIME_TYPE["SVG"] = "image/svg+xml";
        MIME_TYPE["ICO"] = "image/x-icon";
        MIME_TYPE["CSV"] = "text/csv";
        MIME_TYPE["CSS"] = "text/css";
        MIME_TYPE["JAVASCRIPT"] = "text/javascript";
        MIME_TYPE["TYPESCRIPT"] = "text/typescript";
        MIME_TYPE["WEBM"] = "video/webm";
        MIME_TYPE["OGG"] = "video/ogg";
        MIME_TYPE["OGV"] = "video/ogv";
        MIME_TYPE["WAV"] = "audio/wav";
        MIME_TYPE["WEBP"] = "image/webp";
        MIME_TYPE["WOFF"] = "font/woff";
        MIME_TYPE["WOFF2"] = "font/woff2";
        MIME_TYPE["TTF"] = "font/ttf";
        MIME_TYPE["EOT"] = "application/vnd.ms-fontobject";
        MIME_TYPE["OTF"] = "font/otf";
        MIME_TYPE["XLS"] = "application/vnd.ms-excel";
        MIME_TYPE["XLSX"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        MIME_TYPE["DOC"] = "application/msword";
        MIME_TYPE["DOCX"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        MIME_TYPE["PPT"] = "application/vnd.ms-powerpoint";
        MIME_TYPE["PPTX"] = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        MIME_TYPE["MSG"] = "application/vnd.ms-outlook";
        MIME_TYPE["RTF"] = "application/rtf";
        MIME_TYPE["PSD"] = "application/photoshop";
        MIME_TYPE["AI"] = "application/postscript";
        MIME_TYPE["EPS"] = "application/postscript";
        MIME_TYPE["XPS"] = "application/vnd.ms-xpsdocument";
        MIME_TYPE["SWF"] = "application/x-shockwave-flash";
        MIME_TYPE["FLV"] = "video/x-flv";
        MIME_TYPE["MIDI"] = "audio/midi";
        MIME_TYPE["WMA"] = "audio/x-ms-wma";
        MIME_TYPE["WAX"] = "audio/x-ms-wax";
        MIME_TYPE["MKA"] = "audio/x-matroska";
        MIME_TYPE["MKV"] = "video/x-matroska";
        MIME_TYPE["AVI"] = "video/x-msvideo";
        MIME_TYPE["MOV"] = "video/quicktime";
        MIME_TYPE["WMV"] = "video/x-ms-wmv";
        MIME_TYPE["M4A"] = "audio/mp4";
        MIME_TYPE["M4V"] = "video/mp4";
        MIME_TYPE["F4V"] = "video/mp4";
        MIME_TYPE["F4A"] = "audio/mp4";
        MIME_TYPE["F4B"] = "audio/mp4";
        MIME_TYPE["M4B"] = "audio/mp4";
        MIME_TYPE["M4R"] = "audio/mp4";
        MIME_TYPE["MPGA"] = "audio/mpeg";
        MIME_TYPE["MP2"] = "audio/mpeg";
        MIME_TYPE["MP2A"] = "audio/mpeg";
        MIME_TYPE["M2A"] = "audio/mpeg";
        MIME_TYPE["M3A"] = "audio/mpeg";
        MIME_TYPE["OGA"] = "audio/ogg";
    })(MIME_TYPE || (MIME_TYPE = {}));
    var TEXT_ENCODING;
    (function (TEXT_ENCODING) {
        TEXT_ENCODING["UTF8"] = "UTF-8";
        TEXT_ENCODING["UTF16"] = "UTF-16";
        TEXT_ENCODING["UTF16BE"] = "UTF-16BE";
        TEXT_ENCODING["UTF16LE"] = "UTF-16LE";
        TEXT_ENCODING["ISO88591"] = "ISO-8859-1";
        TEXT_ENCODING["ISO88592"] = "ISO-8859-2";
        TEXT_ENCODING["ISO88593"] = "ISO-8859-3";
        TEXT_ENCODING["ISO88594"] = "ISO-8859-4";
        TEXT_ENCODING["ISO88595"] = "ISO-8859-5";
        TEXT_ENCODING["ISO88596"] = "ISO-8859-6";
        TEXT_ENCODING["ISO88597"] = "ISO-8859-7";
        TEXT_ENCODING["ISO88598"] = "ISO-8859-8";
        TEXT_ENCODING["ISO88599"] = "ISO-8859-9";
        TEXT_ENCODING["ISO885910"] = "ISO-8859-10";
        TEXT_ENCODING["ISO885913"] = "ISO-8859-13";
        TEXT_ENCODING["ISO885914"] = "ISO-8859-14";
        TEXT_ENCODING["ISO885915"] = "ISO-8859-15";
        TEXT_ENCODING["ISO885916"] = "ISO-8859-16";
        TEXT_ENCODING["KOI8R"] = "KOI8-R";
        TEXT_ENCODING["KOI8U"] = "KOI8-U";
        TEXT_ENCODING["MACINTOSH"] = "macintosh";
        TEXT_ENCODING["WINDOWS1250"] = "windows-1250";
        TEXT_ENCODING["WINDOWS1251"] = "windows-1251";
        TEXT_ENCODING["WINDOWS1252"] = "windows-1252";
        TEXT_ENCODING["WINDOWS1253"] = "windows-1253";
        TEXT_ENCODING["WINDOWS1254"] = "windows-1254";
        TEXT_ENCODING["WINDOWS1255"] = "windows-1255";
        TEXT_ENCODING["WINDOWS1256"] = "windows-1256";
        TEXT_ENCODING["WINDOWS1257"] = "windows-1257";
        TEXT_ENCODING["WINDOWS1258"] = "windows-1258";
        TEXT_ENCODING["XMACCYRILLIC"] = "x-mac-cyrillic";
        TEXT_ENCODING["GB18030"] = "GB18030";
        TEXT_ENCODING["BIG5"] = "Big5";
        TEXT_ENCODING["SHIFTJIS"] = "Shift_JIS";
        TEXT_ENCODING["EUCJP"] = "EUC-JP";
        TEXT_ENCODING["ISO2022JP"] = "ISO-2022-JP";
        TEXT_ENCODING["EUCKR"] = "EUC-KR";
        TEXT_ENCODING["ISO2022KR"] = "ISO-2022-KR";
        TEXT_ENCODING["IBM866"] = "IBM866";
        TEXT_ENCODING["IBM775"] = "IBM775";
        TEXT_ENCODING["ISO885911"] = "ISO-8859-11";
        TEXT_ENCODING["WINDOWS874"] = "windows-874";
        TEXT_ENCODING["TIS620"] = "TIS-620";
    })(TEXT_ENCODING || (TEXT_ENCODING = {}));

    /**
     * A class that represents a response from a fetch request.
     * @description Encapsulates the data and methods for easy fetching
     * @author Akrck02
     */
    class Response {
        constructor(response) {
            this.response = response;
            this.middleware = [];
            this.errorFunction = (err) => console.error("Error in response : ", err);
            this.statusFunctions = new Map();
            this.statusFunctions.set(200, (res) => console.log("Success", res));
        }
        /**
         * Executes the callback functions corresponding to the status code getting the response as a json object.
         * in case of an error, the error function will be executed.
         *
         * @example
         * await EasyFetch.get({
         *   url: "https://mydomain/json/1",
         *   parameters: {
         *        name: "John",
         *   },
         *   headers: {
         *      "Content-type": "application/json",
         *   }
         * })
         * .status(200,(response) => {
         *    console.log(response);
         * })
         * .status(404,(response) => {
         *   console.log("NOT FOUND: ",response);
         * })
         * .error((error) => {
         *   console.error(error);
         * })
         * .json()
         */
        async json() {
            await this.response
                .then(async (res) => {
                if (this.statusFunctions.has(res.status)) {
                    let json = await res.json();
                    await this.statusFunctions.get(res.status)(json);
                }
            })
                .catch((err) => this.errorFunction(err));
        }
        /**
         * Executes the callback function corresponding to the status code getting the response as a text.
         * in case of an error, the error function will be executed.
         * @example
         * await EasyFetch.get({
         *   url: "https://mydomain/text/1",
         *   parameters: {
         *        name: "John",
         *   },
         *   headers: {
         *      "Content-type": "text/plain",
         *   }
         * })
         * .status(200,(response) => {
         *    console.log(response);
         * })
         * .status(404,(response) => {
         *   console.log("NOT FOUND: ",response);
         * })
         * .error((error) => {
         *   console.error(error);
         * })
         * .text()
         */
        async text() {
            await this.response
                .then(async (res) => {
                if (this.statusFunctions.has(res.status)) {
                    let text = await res.text();
                    await this.statusFunctions.get(res.status)(text);
                }
            })
                .catch((err) => this.errorFunction(err));
        }
        /**
         * Executes the callback function corresponding to the status code getting the response as a blob.
         * in case of an error, the error function will be executed.
         * @example
         * await EasyFetch.get({
         *  url: "https://mydomain/blob/1",
         * parameters: {
         *     name: "John",
         * },
         * headers: {
         *    "Content-type": "application/octet-stream",
         * }
         * })
         * .status(200,(response) => {
         *   console.log(response);
         * })
         * .status(404,(response) => {
         *  console.log("NOT FOUND: ",response);
         * })
         * .error((error) => {
         *  console.error(error);
         * })
         * .blob()
         */
        async blob() {
            await this.response
                .then(async (res) => {
                if (this.statusFunctions.has(res.status)) {
                    let blob = await res.blob();
                    await this.statusFunctions.get(res.status)(blob);
                }
            })
                .catch((err) => this.errorFunction(err));
        }
        /**
         * Sets the callback function to be executed corresponding to the status code.
         * @param code the status code or list of status codes
         * @param success the callback function
         * @returns the response itself
         */
        status(code, func) {
            let numbers = [];
            if (typeof code === "number") {
                numbers.push(code);
            }
            else {
                numbers = code;
            }
            for (let i = 0; i < numbers.length; i++) {
                this.statusFunctions.set(numbers[i], func);
            }
            return this;
        }
        /**
         * Sets the callback function to be executed when the response is unsuccessful.
         * @param error the callback function
         * @returns the response itself
         */
        error(error) {
            this.errorFunction = error;
            return this;
        }
    }
    class EasyFetch {
        static get(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.GET,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        static post(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.POST,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        static put(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.PUT,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        static delete(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.DELETE,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        static patch(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.PATCH,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        static head(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.HEAD,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        static options(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.OPTIONS,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        static connect(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.CONNECT,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        static trace(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.TRACE,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        static update(properties) {
            return EasyFetch.exec({
                method: HTTPS_METHOD.UPDATE,
                parameters: properties.parameters,
                url: properties.url,
                headers: properties.headers,
                charset: properties.charset,
                contentType: properties.contentType
            });
        }
        /**
         * Adds a middleware function to be executed before the request is sent.
         * @param func the middleware function
         */
        static addMiddleware(func) {
            EasyFetch.middleware.push(func);
        }
        /**
         * Removes a middleware function.
         * @param func the middleware function
         * @returns true if the function was removed, false otherwise
         */
        static exec(properties) {
            let options = {
                method: properties.method,
                headers: {
                    "Content-type": `${properties.contentType || "application/json"};charset=${properties.charset || "UTF-8"}`
                },
            };
            properties.headers && Object.assign(options.headers, properties.headers);
            if (properties.method !== HTTPS_METHOD.GET) {
                if (properties.parameters instanceof FormData) {
                    options["body"] = properties.parameters;
                    options.headers["Content-type"] = `multipart/form-data;charset=${properties.charset || "UTF-8"}`;
                }
                else {
                    options["body"] = JSON.stringify(properties.parameters);
                }
            }
            const promise = fetch(properties.url, options);
            return new Response(promise);
        }
    }
    EasyFetch.middleware = [];

    var Gtdf;
    (function (Gtdf) {
        Gtdf["BOX_COLUMN"] = "box-column";
        Gtdf["BOX_ROW"] = "box-row";
        Gtdf["BOX_CENTER"] = "box-center";
        Gtdf["BOX_X_CENTER"] = "box-x-center";
        Gtdf["BOX_Y_CENTER"] = "box-y-center";
        Gtdf["BOX_X_BETWEEN"] = "box-x-between";
        Gtdf["TEXT_CENTER"] = "text-center";
        Gtdf["PRIMARY"] = "primary";
        Gtdf["PRIMARY_CONTAINER"] = "primary-container";
        Gtdf["SECONDARY_CONTAINER"] = "secondary-container";
        Gtdf["TERTIARY_CONTAINER"] = "tertiary-container";
    })(Gtdf || (Gtdf = {}));

    const { abs, min, max, round } = Math;
    /**
     * This class is used to extract the colors from a base color
     * It is used to extract the colors of the different surfaces and texts
     */
    class ColorExtractor {
        /**
         * Extract the colors from a base color
         * @param baseColor The base color to extract from
         * @returns The extracted colors palette
         */
        static extractColors(baseColor = "#000000", lightMode = true) {
            const rgbBaseColor = ColorExtractor.hexToRgb(baseColor);
            const hslColor = ColorExtractor.rgbToHsl(rgbBaseColor);
            hslColor.l = 0;
            //hslColor.s = 0;
            const extractedColors = [ColorExtractor.hslToRgb(hslColor)];
            while (hslColor.l < 1) {
                hslColor.l += .05;
                extractedColors.push(ColorExtractor.hslToRgb(hslColor));
            }
            if (lightMode)
                extractedColors.reverse();
            console.log(extractedColors);
            const textDark = { r: 0, g: 0, b: 0 };
            const textLight = { r: 255, g: 255, b: 255 };
            const background = extractedColors[2];
            const onBackground = ColorExtractor.isLight(background) ? textDark : textLight;
            const surface1 = extractedColors[3];
            const onSurface1 = ColorExtractor.isLight(surface1) ? textDark : textLight;
            const surface2 = extractedColors[4];
            const onSurface2 = ColorExtractor.isLight(surface2) ? textDark : textLight;
            const surface3 = extractedColors[5];
            const onSurface3 = ColorExtractor.isLight(surface3) ? textDark : textLight;
            const surface4 = extractedColors[6];
            const onSurface4 = ColorExtractor.isLight(surface3) ? textDark : textLight;
            const surface5 = extractedColors[7];
            const onSurface5 = ColorExtractor.isLight(surface3) ? textDark : textLight;
            const surface6 = extractedColors[8];
            const onSurface6 = ColorExtractor.isLight(surface3) ? textDark : textLight;
            return {
                surface1: ColorExtractor.rgbToHex(surface1),
                onSurface1: ColorExtractor.rgbToHex(onSurface1),
                surface2: ColorExtractor.rgbToHex(surface2),
                onSurface2: ColorExtractor.rgbToHex(onSurface2),
                surface3: ColorExtractor.rgbToHex(surface3),
                onSurface3: ColorExtractor.rgbToHex(onSurface3),
                surface4: ColorExtractor.rgbToHex(surface4),
                onSurface4: ColorExtractor.rgbToHex(onSurface4),
                surface5: ColorExtractor.rgbToHex(surface5),
                onSurface5: ColorExtractor.rgbToHex(onSurface5),
                surface6: ColorExtractor.rgbToHex(surface6),
                onSurface6: ColorExtractor.rgbToHex(onSurface6),
                background: ColorExtractor.rgbToHex(background),
                onBackground: ColorExtractor.rgbToHex(onBackground),
            };
        }
        /*
        * Convert hexadecimal  to rgb
        * @param hex The hex value to convert
        * @returns The rgb value
        * */
        static hexToRgb(hex) {
            const hexValue = hex.substring(1);
            const red = hexValue.substring(0, 2);
            const green = hexValue.substring(2, 4);
            const blue = hexValue.substring(4, 6);
            return {
                r: parseInt(red, 16),
                g: parseInt(green, 16),
                b: parseInt(blue, 16)
            };
        }
        /**
         * Convert RGB to hex
         * @param rgb The rgb color to convert
         * @returns The hex string
         */
        static rgbToHex(rgb) {
            const red = rgb.r.toString(16).padStart(2, '0');
            const green = rgb.g.toString(16).padStart(2, '0');
            const blue = rgb.b.toString(16).padStart(2, '0');
            return `#${red}${green}${blue}`;
        }
        /**
         * Get if the color is light
         * @param color The color to check
         * @returns If the color is light
         */
        static isLight(color) {
            return color.r + color.g + color.b >= 127 * 2;
        }
        /**
         * Converts an HSL color value to RGB. Conversion formula
         * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes h, s, and l are contained in the set [0, 1] and
         * returns r, g, and b in the set [0, 255].
         *
         * @param   {number}  h       The hue
         * @param   {number}  s       The saturation
         * @param   {number}  l       The lightness
         * @return  {Color}           The RGB representation
         */
        static hslToRgb(color) {
            let r, g, b;
            if (color.s === 0) {
                r = g = b = color.l; // achromatic
            }
            else {
                const q = color.l < 0.5 ? color.l * (1 + color.s) : color.l + color.s - color.l * color.s;
                const p = 2 * color.l - q;
                r = ColorExtractor.hueToRgb(p, q, color.h + 1 / 3);
                g = ColorExtractor.hueToRgb(p, q, color.h);
                b = ColorExtractor.hueToRgb(p, q, color.h - 1 / 3);
            }
            return { r: round(r * 255), g: round(g * 255), b: round(b * 255) };
        }
        /**
         * Converts an RGB color value to HSL. Conversion formula
         * @param p
         * @param q
         * @param t
         * @returns
         */
        static hueToRgb(p, q, t) {
            if (t < 0)
                t += 1;
            if (t > 1)
                t -= 1;
            if (t < 1 / 6)
                return p + (q - p) * 6 * t;
            if (t < 1 / 2)
                return q;
            if (t < 2 / 3)
                return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        /**
         * Converts an RGB color value to HSL. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes r, g, and b are contained in the set [0, 255] and
         * returns h, s, and l in the set [0, 1].
         *
         * @param   {number}  r       The red color value
         * @param   {number}  g       The green color value
         * @param   {number}  b       The blue color value
         * @return  {Array}           The HSL representation
         */
        static rgbToHsl(color) {
            const newColor = {
                r: color.r / 255,
                g: color.g / 255,
                b: color.b / 255
            };
            const vmax = max(newColor.r, newColor.g, newColor.b), vmin = min(newColor.r, newColor.g, newColor.b);
            let h, s, l = (vmax + vmin) / 2;
            if (vmax === vmin) {
                return { h: 0, s: 0, l: l }; // achromatic
            }
            const d = vmax - vmin;
            s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
            if (vmax === newColor.r)
                h = (newColor.g - newColor.b) / d + (color.g < color.b ? 6 : 0);
            if (vmax === newColor.g)
                h = (newColor.b - newColor.r) / d + 2;
            if (vmax === newColor.b)
                h = (newColor.r - newColor.g) / d + 4;
            h /= 6;
            return { h: h, s: s, l: l };
        }
    }

    var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$2 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var HomeView_1;
    let HomeView = HomeView_1 = class HomeView extends ViewUI {
        constructor() {
            super({
                type: HTML.VIEW,
                id: HomeView_1.ID,
                classes: [Gtdf.BOX_COLUMN, Gtdf.BOX_CENTER],
            });
        }
        async show(params, container) {
            this.clean();
            (await this.createTrademark())?.appendTo(this);
            const title = new UIComponent({
                type: HTML.H5,
                classes: [Gtdf.TEXT_CENTER],
                text: `<span style="opacity:.8">Select a color on edit button to adapt</span> the application theme`,
                styles: {
                    lineHeight: "1.5"
                }
            });
            title.appendTo(this);
            this.createActionButtons().appendTo(this);
            this.createColorPicker().appendTo(this);
            for (let i = 0; i < 4; i++) {
                this.createUserPost().appendTo(this);
            }
            this.actionButton = this.createActionButton();
            this.actionButton.appendTo(this);
            this.createNavBar().appendTo(this);
            this.changeTheme("#0a0a0a", this.lightMode);
            this.appendTo(container);
        }
        /**
         * Create trademark info
         */
        async createTrademark() {
            const tradeMarkContainer = new UIComponent({
                type: HTML.A,
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
                attributes: {
                    href: Config.Variables.github_url
                },
                styles: {
                    width: "100%"
                }
            });
            let githubIconSVG = "";
            await EasyFetch.get({ url: Config.Path.icons + "github.svg", parameters: {} })
                .status(200, (data) => { githubIconSVG = data; }).text();
            const github = new UIComponent({
                text: githubIconSVG,
                id: "github-icon"
            });
            github.appendTo(tradeMarkContainer);
            const trademark = new UIComponent({
                text: `Akrck02 - ${new Date().getFullYear()}`,
                styles: {
                    marginLeft: "1rem",
                    fontSize: ".8rem",
                    opacity: ".6"
                }
            });
            trademark.appendTo(tradeMarkContainer);
            return tradeMarkContainer;
        }
        /**
         * Create the real button bar
         * @returns The buttonbar
         */
        createActionButtons() {
            const buttons = new UIComponent({
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER]
            });
            const downloadButton = new UIComponent({
                type: HTML.BUTTON,
                text: "Download",
                classes: [Gtdf.BOX_CENTER],
                styles: {
                    margin: "10px 0"
                }
            });
            downloadButton.setEvents({
                click: (e) => {
                    // download the current color palette as a json file
                    const a = document.createElement('a');
                    const file = new Blob([JSON.stringify(this.colorPalette, null, 4)], { type: 'application/json' });
                    a.href = URL.createObjectURL(file);
                    a.download = 'color-palette.json';
                    a.click();
                    URL.revokeObjectURL(a.href);
                }
            });
            const icon = new UIComponent({
                type: HTML.SPAN,
                classes: ["material-symbols-outlined"],
                text: "download",
                styles: {
                    marginLeft: ".5rem"
                }
            });
            icon.appendTo(downloadButton);
            downloadButton.appendTo(buttons);
            const darkLightButton = new UIComponent({
                type: HTML.BUTTON,
                classes: [Gtdf.BOX_CENTER],
                styles: {
                    height: "3.5rem"
                }
            });
            this.lightMode = true;
            let darkLightButtonIcon = new UIComponent({
                type: HTML.SPAN,
                classes: ["material-symbols-outlined"],
                text: "dark_mode",
            });
            darkLightButtonIcon.appendTo(darkLightButton);
            darkLightButton.appendTo(buttons);
            darkLightButton.setEvents({
                click: () => {
                    this.lightMode = !this.lightMode;
                    darkLightButtonIcon.element.innerText = this.lightMode ? "dark_mode" : "light_mode";
                    this.changeTheme(this.colorPicker.getValue(), this.lightMode);
                }
            });
            return buttons;
        }
        /**
         * Create the color picker section
         * @returns
         */
        createColorPicker() {
            const colorPickerContainer = new UIComponent({
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_CENTER],
            });
            this.colorPicker = new UIComponent({
                type: HTML.INPUT,
                id: "color-picker",
                attributes: {
                    type: "color",
                },
                styles: {
                    display: "none"
                }
            });
            this.colorPicker.appendTo(colorPickerContainer);
            this.colorPicker.setEvents({
                input: (e) => {
                    const value = this.colorPicker.getValue();
                    this.changeTheme(value, this.lightMode);
                }
            });
            return colorPickerContainer;
        }
        /**
         * Changes the theme of the app based on the color selected
         * @param value The color selected
         */
        changeTheme(value, lightMode) {
            try {
                this.colorPalette = ColorExtractor.extractColors(value, lightMode);
                document.body.style.setProperty("--background-color", this.colorPalette.background);
                document.body.style.setProperty("--on-background-color", this.colorPalette.onBackground);
                document.body.style.setProperty("--primary-container-color", this.colorPalette.surface1);
                document.body.style.setProperty("--on-primary-container-color", this.colorPalette.onSurface1);
                document.body.style.setProperty("--secondary-container-color", this.colorPalette.surface2);
                document.body.style.setProperty("--on-secondary-container-color", this.colorPalette.onSurface2);
                document.body.style.setProperty("--tertiary-container-color", this.colorPalette.surface3);
                document.body.style.setProperty("--on-tertiary-container-color", this.colorPalette.onSurface3);
                document.body.style.setProperty("--item-background-color", this.colorPalette.surface2);
                document.body.style.setProperty("--on-item-background-color", this.colorPalette.onSurface2);
            }
            catch (e) {
                console.error(e);
                alert({
                    title: "Error",
                    message: "An error occurred while changing the theme",
                    icon: "close"
                });
            }
            console.table(this.colorPalette);
        }
        /**
         * Creates a fake user post
         * @returns The user post
         */
        createUserPost() {
            const card = new UIComponent({
                classes: ["card", Gtdf.PRIMARY_CONTAINER, Gtdf.BOX_COLUMN],
            });
            const postHeader = new UIComponent({
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_Y_CENTER, Gtdf.BOX_X_BETWEEN],
            });
            postHeader.appendTo(card);
            const userData = new UIComponent({
                classes: ["user", Gtdf.BOX_ROW, Gtdf.BOX_Y_CENTER],
            });
            userData.appendTo(postHeader);
            const userPic = new UIComponent({
                type: HTML.IMG,
                classes: ["user-profile-pic"],
                attributes: {
                    src: Config.Path.images + "akrck02.jpg",
                    alt: "akrck02"
                }
            });
            userPic.appendTo(userData);
            const msgInfo = new UIComponent({
                classes: ["msg-info", Gtdf.BOX_COLUMN],
            });
            msgInfo.appendTo(userData);
            const username = new UIComponent({
                type: HTML.P,
                classes: ["username"],
                text: "Akrck02"
            });
            username.appendTo(msgInfo);
            const date = new UIComponent({
                type: HTML.P,
                classes: ["date"],
                text: "4 min ago"
            });
            date.appendTo(msgInfo);
            const moreVert = new UIComponent({
                type: HTML.SPAN,
                classes: ["material-symbols-outlined"],
                text: "more_vert"
            });
            moreVert.appendTo(postHeader);
            const messageTo = new UIComponent({
                type: HTML.P,
                classes: ["message-to"],
                text: "To Juan Diaz"
            });
            messageTo.appendTo(card);
            const content = new UIComponent({
                classes: ["content"],
                text: `This is a random test, just ignore it.<br>
            Chekout my Github for other useless projects 🤓<br><br>
            I really hope you enjoy this theme generator.<br>
            checkout <a href="https://github.com/akrck02/Bubble-UI" style="opacity:.5">BubbleUI</a> for more UI magic! 💫💫💫<br><br>
            Miau miau miau miau miau miau miau miau miau miau miau<br>
            miau miau miau miau miau miau miau 🐈<br><br>`
            });
            content.appendTo(card);
            const buttonBar = new UIComponent({
                classes: ["button-bar"],
            });
            buttonBar.appendTo(card);
            const buttonBarButtons = new UIComponent({
                classes: [Gtdf.BOX_ROW, Gtdf.BOX_X_CENTER],
            });
            buttonBarButtons.appendTo(buttonBar);
            const discardButton = new UIComponent({
                type: HTML.BUTTON,
                text: "Discard"
            });
            discardButton.appendTo(buttonBarButtons);
            const replyButton = new UIComponent({
                type: HTML.BUTTON,
                text: "Reply"
            });
            replyButton.appendTo(buttonBarButtons);
            return card;
        }
        /**
         * Creates the fake action button
         * @returns The action button
         */
        createActionButton() {
            const actionButton = new UIComponent({
                type: HTML.BUTTON,
                classes: ["new-mail"],
            });
            actionButton.setEvents({
                click: (e) => {
                    this.colorPicker.element.click();
                }
            });
            const icon = new UIComponent({
                type: HTML.SPAN,
                classes: ["material-symbols-outlined"],
                text: "edit"
            });
            icon.appendTo(actionButton);
            return actionButton;
        }
        /*
        * Creates the fake navigation bar
        * @returns The navigation bar
        */
        createNavBar() {
            const navBar = new UIComponent({
                classes: ["nav-bar", Gtdf.BOX_ROW, Gtdf.BOX_CENTER, Gtdf.SECONDARY_CONTAINER]
            });
            this.createNavBarButton("all_inbox", "inbox").appendTo(navBar);
            this.createNavBarButton("group", "groups").appendTo(navBar);
            this.createSeparator().appendTo(navBar);
            this.createNavBarButton("chat", "chat").appendTo(navBar);
            this.createNavBarButton("account_circle", "account").appendTo(navBar);
            return navBar;
        }
        /**
         * Creates a fake navigation bar button
         * @param icon The icon to display
         * @param label The label to display
         * @returns The navigation bar button
         */
        createNavBarButton(icon, label) {
            const buttonGroup = new UIComponent({
                classes: ["button-group", Gtdf.BOX_COLUMN],
            });
            const button = new UIComponent({
                type: HTML.BUTTON,
                id: "inbox",
            });
            button.appendTo(buttonGroup);
            const iconComponent = new UIComponent({
                type: HTML.SPAN,
                classes: ["material-symbols-outlined"],
                text: icon
            });
            iconComponent.appendTo(button);
            const labelComponent = new UIComponent({
                type: HTML.LABEL,
                attributes: {
                    for: "inbox"
                },
                text: label
            });
            labelComponent.appendTo(buttonGroup);
            return buttonGroup;
        }
        /**
         * Creates a fake blank space
         * @returns The blank space
         */
        createSeparator() {
            return new UIComponent({
                classes: ["separator"],
            });
        }
    };
    HomeView.ID = "home";
    HomeView = HomeView_1 = __decorate$2([
        Route([undefined, "home", ""]),
        Singleton(),
        __metadata$2("design:paramtypes", [])
    ], HomeView);
    var HomeView$1 = HomeView;

    var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata$1 = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var Router_1;
    let Router = Router_1 = class Router {
        constructor() {
            this.Endpoints = [HomeView$1, ErrorView$1];
            {
                this.parent = document.getElementById("view-container");
                //If no parent is present on the HTML file throws an error
                if (!this.parent) {
                    throw new InitializeError("view-container does not exist");
                }
                this.container = new UIComponent({
                    type: "div",
                    id: "view-container-box",
                    styles: {
                        width: "100%",
                        height: "100%",
                    },
                });
                this.container.appendTo(this.parent);
                this.changeViewSignal = new Signal("changeView");
                SignalBuffer.add(this.changeViewSignal);
                this.changeViewSignal.subscribe(this);
                this.viewChangedSignal = new Signal(Router_1.VIEW_CHANGED_SIGNAL);
                SignalBuffer.add(this.viewChangedSignal);
            }
        }
        async update(data) {
            console.debug(data);
            console.debug(`Router update to /${data.view}`);
            let params = [];
            if (data.params) {
                params.push(data.view);
                params = params.concat(data.params);
            }
            await this.load(params);
        }
        /**
         * Load the app state with the given params
         * @param params The list of params
         */
        async load(params) {
            try {
                this.clear();
                this.container.clean();
                let found = false;
                Routes.forEach((route) => {
                    if (route.isPointing(params[0])) {
                        route.clean();
                        route.show(params.splice(1), this.container);
                        this.viewChangedSignal.emit({
                            view: route.routes[0],
                            params: params.splice(1),
                        });
                        found = true;
                    }
                });
                if (!found) {
                    ErrorView$1.instance().show(["404"], this.container);
                    this.viewChangedSignal.emit({
                        view: ErrorView$1.instance().routes[0],
                        params: ["404"],
                    });
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        /**
         * Clear the container
         */
        clear() {
            this.container.element.innerHTML = "";
        }
    };
    Router.CHAGE_VIEW_SIGNAL = "changeView";
    Router.VIEW_CHANGED_SIGNAL = "viewChanged";
    Router = Router_1 = __decorate$1([
        Singleton(),
        StaticImplements(),
        __metadata$1("design:paramtypes", [])
    ], Router);
    var Router$1 = Router;

    /**
     * Abstract class representing those classes
     * that listen to events to handle them in a
     * specific way.
     *
     * The ping() method has testing purposes and
     * can be deleted.
     */
    class Listener {
        ping() {
            alert({
                title: "Connected",
                icon: "notifications",
                message: "Pong!",
                desktop: true,
            });
        }
        ;
    }

    /**
     * Example listener to show how to create Listener
     * extended classes
     */
    class ExampleListener extends Listener {
        constructor() {
            super();
        }
    }

    /**
     * Event listeners for the application
     */
    const Events = {
        example: new ExampleListener()
    };

    class Keyboard {
        static setEventListeners(listeners) {
            document.addEventListener('keyup', function (event) {
                // CTRL + period
                if (event.ctrlKey && event.code === 'Period') {
                    listeners.example.ping();
                }
            });
        }
    }

    /**
     * Material icon loader observer
     */
    class MaterialIconsLoader {
        constructor() {
            this.collection = null;
        }
        async update() {
            if (!this.collection) {
                this.collection = await fetch(Config.Path.icons + "materialicons.json").then((response) => response.json());
            }
        }
    }
    /**
     * Material Icons utility class
     */
    class MaterialIcons {
        constructor() {
            this.observer = new MaterialIconsLoader();
        }
        static get instance() {
            if (!MaterialIcons._instance) {
                MaterialIcons._instance = new MaterialIcons();
            }
            return MaterialIcons._instance;
        }
        get loader() {
            return this.observer;
        }
        /**
         * Get collection of Material Icons
         * @returns The collection of Material Icons
         * @example
         *   MaterialIcons.collection();
         *
         *  // Returns
         * {
         *   "add": "<svg>...</svg>",
         *  "add_circle": "<svg>...</svg>",
         * ...
         * }
         */
        get collection() {
            return this.observer.collection;
        }
        /**
         * Get a Material Icons SVG by name.
         * @param name The name of the icon.
         * @param properties The properties of the icon.
         * @returns The container of the SVG as a UIComponent.
         */
        static get(name, properties) {
            properties.svg = MaterialIcons.instance.collection[name] || "";
            let text = createSVG(properties);
            const icon = new UIComponent({
                type: "div",
                classes: ["icon", "box-center"],
                text: text,
            });
            return icon;
        }
    }
    /**
     * Create svg in 24 x 24 viewBox
     * @param properties properties
     * @returns svg inside a string
     * @example
     *    createSvg({
     *        fill: '#202020',
     *        size: '24',
     *        classes: ['material-icons'],
     *        svg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>'
     *    });
     *    // returns: <svg viewBox="0 0 24 24" class="material-icons">
     */
    function createSVG(properties) {
        const svg = `
    <svg class="${properties?.classes?.join(" ")}" width="${properties.size}" height="${properties.size}" viewBox="0 0 24 24" fill="${properties.fill}" xmlns="http://www.w3.org/2000/svg">
    ${properties.svg}
    </svg>
    `;
        return svg;
    }

    class NotificationUI extends UIComponent {
        constructor() {
            super({
                type: "notification",
                classes: ["box-column"],
            });
            this.bar = new UIComponent({
                id: "nt-bar",
            });
            this.content = new UIComponent({
                id: "nt-content",
                classes: ["box-row", "box-y-center", "box-x-between"],
            });
            this.showing = false;
            this.appendChild(this.bar);
            this.appendChild(this.content);
        }
        /**
         * Set the notification content
         * @param properties The content to set with title, message and other properties
         */
        setContent(properties) {
            this.bar.clean();
            this.content.clean();
            if (properties.title) {
                const title = new UIComponent({
                    type: "h1",
                    id: "nt-title",
                    text: properties.title,
                });
                this.bar.element.classList.remove("hidden");
                this.bar.appendChild(title);
            }
            else {
                this.bar.setClasses(["hidden"]);
            }
            if (properties.message) {
                const text = new UIComponent({
                    type: "span",
                    text: properties.message
                });
                this.content.appendChild(text);
            }
            if (properties.icon) {
                const icon = MaterialIcons.get(properties.icon, { size: "1.5em", fill: "#404040" });
                this.content.appendChild(icon);
            }
        }
        async show(seconds = 1) {
            if (this.showing)
                return;
            setTimeout(() => {
                this.setClasses(["show"]);
            }, 1);
            this.showing = true;
            setTimeout(() => {
                this.element.classList.remove("show");
                this.showing = false;
            }, 1000 + seconds * 1000);
        }
    }

    class TextBundle {
        constructor() { }
        /**
         * Get the singleton instance of the class
         * @returns The singleton instance of the class
         */
        static get instance() {
            if (!TextBundle._instance) {
                TextBundle._instance = new TextBundle();
            }
            return TextBundle._instance;
        }
        /**
         * Update the bundle with the current language
         */
        async update() {
            this.bundle = {};
            for (let bundle of TextBundle.AVAILABLE_BUNDLES) {
                this.bundle[bundle] = await fetch(`${Config.Path.language}${Config.getLanguage()}/${bundle}.json`).then(response => response.json());
            }
            for (let bundle of TextBundle.AVAILABLE_BUNDLES) {
                this.bundle[bundle] = new Proxy(this.bundle[bundle], {
                    get: function (target, prop, receiver) {
                        return target[prop] || "";
                    },
                    set: function (target, prop, value) {
                        return false;
                    }
                });
            }
        }
    }
    TextBundle.AVAILABLE_BUNDLES = [
        "login",
    ];
    TextBundle.reloadSignal = new Signal("reload_text");
    new Proxy(TextBundle.instance, {
        get: function (target, prop, receiver) {
            if (!target.bundle) {
                return "";
            }
            return target.bundle[prop] || "";
        },
        set: function (target, prop, value) {
            return false;
        }
    });
    TextBundle.reloadSignal.subscribe(TextBundle.instance);

    class Initializer {
        constructor() {
            this.initSignal = new Signal(Initializer.SIGNAL_ID);
        }
        /**
         * Get an instance of Initializer
         */
        static get instance() {
            if (!Initializer._instance) {
                Initializer._instance = new Initializer();
            }
            return Initializer._instance;
        }
        /**
         * Subscribe to the init signal
         * @returns The observable instance
         */
        static async subscribeInitializables() {
            if (Initializer.performed) {
                return;
            }
            for (let subscriber of Initializer.subscribers) {
                await Initializer.instance.initSignal.subscribe(subscriber);
            }
        }
        static async notify() {
            if (Initializer.performed) {
                return;
            }
            Initializer.performed = true;
            await Initializer.instance.initSignal.emit();
        }
    }
    Initializer.SIGNAL_ID = "init";
    Initializer.performed = false;
    Initializer.subscribers = [
        Configuration.instance,
        MaterialIcons.instance.loader,
        TextBundle.instance
    ];

    var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (undefined && undefined.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    /**
     * Class that represents the application frontend proccess
     * it can be intantiated more than once, but the classic
     * web application structure wont need it.
     */
    let App = class App {
        /**
         * Create an instance of the apjplication
         */
        constructor() {
            this.router = Router$1.instance();
            this.events = Events;
            Keyboard.setEventListeners(this.events);
            // Set the notification element
            this.notification = new NotificationUI();
            document.body.appendChild(this.notification.element);
            this.setNoficationSystem();
        }
        /**
         * Load the app state with the given URL address
         * The URL get parsed to take the parameters in
         * a list.
         *
         * In the URL https://mydomain.org/#/object/123
         * the parameter list will be the following : [object,123]
         *
         * The first parameter must be a view name, otherwise the
         * app will redirect the user to an 404 error page.
         */
        async load() {
            await Initializer.subscribeInitializables();
            await Initializer.notify();
            const params = URLs.getParametersByIndex(window.location.hash.slice(1).toLowerCase(), 1);
            this.router.load(params);
        }
        /**
         * Override the alert system  with a custom notification widget
         * to send notifications across the app without having to
         * implement an external alert system,
         */
        setNoficationSystem() {
            // Override the default notification function
            window.alert = (properties) => {
                this.notification.setContent(properties);
                this.notification.show(properties.time);
                // If the desktop notification are active 
                if (properties.desktop) {
                    new Notification(Config.Base.app_name, {
                        icon: Config.Path.icons + "logo.svg",
                        body: properties.message,
                    });
                }
            };
        }
    };
    App.performed = false;
    App = __decorate([
        Singleton(),
        StaticImplements(),
        __metadata("design:paramtypes", [])
    ], App);
    var App$1 = App;

    /**
     * When the dynamic URL changes loads
     * the correspoding view from the URL
     */
    window.addEventListener("hashchange", async () => {
        await App$1.instance().load();
    });
    /**
     * When the window is loaded load
     * the app state to show
     */
    window.onload = async () => {
        await App$1.instance().load();
    };

})();
