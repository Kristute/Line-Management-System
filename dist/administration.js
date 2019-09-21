/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/administration.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/administration.js":
/*!******************************!*\
  !*** ./js/administration.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _storage_management__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage-management */ \"./js/storage-management.js\");\n\n\nfunction initializeSpecialistsSelector() {\n  var specialistsData = localStorage.getItem('line-specialists');\n  var dropdown = $('#specialists-dropdown');\n\n  if (specialistsData !== null) {\n    $.each(JSON.parse(specialistsData), function (key, entry) {\n      dropdown.append($('<a class=\"dropdown-item\"></a>').text(entry.specialist));\n    });\n    dropdown.removeClass('d-none');\n  }\n}\n\n$('#load-data').click(function () {\n  $.when(Object(_storage_management__WEBPACK_IMPORTED_MODULE_0__[\"loadJsonDataToLocalStorage\"])('./data/service.json', 'line-data'), Object(_storage_management__WEBPACK_IMPORTED_MODULE_0__[\"loadJsonDataToLocalStorage\"])('./data/clients.json', 'line-clients'), Object(_storage_management__WEBPACK_IMPORTED_MODULE_0__[\"loadJsonDataToLocalStorage\"])('./data/specialists.json', 'line-specialists')).then(function () {\n    $('#import-notification-success').removeClass('d-none');\n    $('#import-notification-success').addClass('show');\n    initializeSpecialistsSelector();\n  }, function () {\n    $('#import-notification-error').removeClass('d-none');\n    $('#import-notification-error').addClass('show');\n  });\n});\ninitializeSpecialistsSelector();\n\n//# sourceURL=webpack:///./js/administration.js?");

/***/ }),

/***/ "./js/storage-management.js":
/*!**********************************!*\
  !*** ./js/storage-management.js ***!
  \**********************************/
/*! exports provided: loadJsonDataToLocalStorage, getData, getClientsBySpecialist, addNewEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadJsonDataToLocalStorage\", function() { return loadJsonDataToLocalStorage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getData\", function() { return getData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getClientsBySpecialist\", function() { return getClientsBySpecialist; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addNewEntry\", function() { return addNewEntry; });\nfunction loadJsonDataToLocalStorage(url, localStorageKey) {\n  return $.ajax({\n    type: 'Get',\n    url: url,\n    dataType: 'json',\n    success: function success(data) {\n      localStorage.setItem(localStorageKey, JSON.stringify(data));\n    },\n    error: function error(e) {\n      console.log(e);\n    }\n  });\n}\nfunction getData(key) {\n  var data = localStorage.getItem(key);\n  return data !== null ? JSON.parse(data) : null;\n}\n\nfunction setData(key, data) {\n  localStorage.setItem(key, JSON.stringify(data));\n}\n\nfunction getNewId(data) {\n  return data.map(function (item) {\n    return item.ID;\n  }).reduce(function (maxValue, currentValue) {\n    return Math.max(maxValue, currentValue);\n  }, 0) + 1;\n}\n\nfunction addNewClient() {\n  var clients = getData('line-clients');\n  var maxQueueNumber = clients.map(function (client) {\n    return client.number;\n  }).reduce(function (maxValue, currentValue) {\n    return Math.max(maxValue, currentValue);\n  }, 0) + 1;\n  var newId = getNewId(clients);\n  clients.push({\n    ID: newId,\n    number: maxQueueNumber\n  });\n  setData('line-clients', clients);\n  return newId;\n}\n\nfunction addNewService(clientId, specialistId) {\n  var service = getData('line-data');\n  var newId = getNewId(service);\n  service.push({\n    ID: newId,\n    client_id: clientId,\n    specialist_id: specialistId\n  });\n  setData('line-data', service);\n  return newId;\n}\n\nfunction getClientsBySpecialist(specialistId) {\n  var serviceLine = getData('line-data');\n\n  if (serviceLine !== null) {\n    var serviceEntries = serviceLine.filter(function (service) {\n      return service.specialist_id === specialistId;\n    });\n\n    if (serviceEntries.length > 0) {\n      var clients = getData('line-clients');\n\n      if (clients !== null) {\n        return clients.filter(function (client) {\n          return serviceEntries.findIndex(function (service) {\n            return service.client_id === client.ID;\n          }) !== -1;\n        });\n      }\n    }\n  }\n\n  return [];\n}\nfunction addNewEntry(specialistId) {\n  var specialists = getData('line-specialists');\n  var specialistById = specialists.find(function (specialist) {\n    return specialist.ID === specialistId;\n  });\n\n  if (typeof specialistById !== 'undefined') {\n    var clients = getData('line-clients');\n    var serviceLine = getData('line-data');\n    var newClientId = addNewClient();\n    addNewService(newClientId, specialistId.ID);\n  }\n} // mark as done service\n// create service time object\n// create new service\n// insert how long it took for service (previous done === next one start till done, insert when started, update when done)\n//\n\n//# sourceURL=webpack:///./js/storage-management.js?");

/***/ })

/******/ });