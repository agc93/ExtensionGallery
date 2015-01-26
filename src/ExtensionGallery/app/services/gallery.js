﻿galleryApp.service("dataService", ["$http", function ($http) {

	var urlBase = "/home/";

	this.normalizePackage = function (package) {

		package.DownloadUrl = "/extensions/" + package.ID + "/extension.vsix";

		if (package.Icon) {
			package.Icon = '/extensions/' + package.ID + '/preview.png';
		} else {
			package.Icon = constants.DEFAULT_ICON_IMAGE;
		}

		if (package.Preview) {
			package.Preview = '/extensions/' + package.ID + '/preview.png';
		} else {
			package.Preview = constants.DEFAULT_PREVIEW_IMAGE;
		}

		package.SupportedVersions = package.SupportedVersions.map(function (v) {
			if (v.indexOf('11.') == 0)
				return 2012;
			if (v.indexOf('12.') == 0)
				return 2013;
			if (v.indexOf('14.') == 0)
				return 2015;
		});

		return package;
	}

	this.getAllExtensions = function () {
		return $http.get(urlBase + "getallextensions");
	}

	this.getExtension = function (id) {
		return $http.get(urlBase + "extension/" + id);
	}

	this.upload = function (bytes) {
		return $http.post(urlBase + 'uploadfile', new Blob([bytes], {}));
	}

}]);

