var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { URLSearchParams } from "@angular/http";
import { UrlSerializer as IonicUrlSerializer, DeepLinkConfigToken } from "ionic-angular";
import { isPresent } from "ionic-angular/util/util";
import { serialize } from "@co.mmons/typescript-utils/json";
/**
 * Implementation of ionic's UrlSerializer, that add page params as query
 * params, instead of path, e.g. "/page/subpage?param1=value".
 *
 * Additionaly it allows to use subarrays in DeepLinkConfig links, which is
 * helpful when AoT compilation is used.
 */
var UrlSerializer = (function (_super) {
    __extends(UrlSerializer, _super);
    function UrlSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlSerializer.setupUrlSerializer = function (config) {
        if (config && config.links) {
            var links = [];
            for (var _i = 0, _a = config.links; _i < _a.length; _i++) {
                var link = _a[_i];
                if (Array.isArray(link)) {
                    for (var _b = 0, link_1 = link; _b < link_1.length; _b++) {
                        var link2 = link_1[_b];
                        links.push(link2);
                    }
                }
                else {
                    links.push(link);
                }
            }
            config.links = links;
        }
        return new UrlSerializer(config);
    };
    UrlSerializer.prototype._createSegment = function (configLink, data) {
        var urlParts = configLink.parts.slice();
        var query;
        if (isPresent(data)) {
            var json = serialize(data);
            for (var key in json) {
                var value = json[key];
                if (value === undefined || value === null) {
                    // we ommit null/undefined
                }
                else if (typeof value !== "function") {
                    if (!query) {
                        query = new URLSearchParams();
                    }
                    if (Array.isArray(value)) {
                        for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                            var i = value_1[_i];
                            query.append(key, i);
                        }
                    }
                    else {
                        query.append(key, value);
                    }
                }
            }
        }
        return {
            id: urlParts.join('/') + (query ? "?" + query.toString() : ""),
            name: configLink.name,
            component: configLink.component,
            loadChildren: configLink.loadChildren,
            data: data,
            defaultHistory: configLink.defaultHistory
        };
    };
    UrlSerializer.prototype.parseUrlParts = function (urlParts) {
        var configLinks = this.links;
        var configLinkLen = configLinks.length;
        var urlPartsLen = urlParts.length;
        var segments = new Array(urlPartsLen);
        for (var i = 0; i < configLinkLen; i++) {
            // compare url parts to config link parts to create nav segments
            var configLink = configLinks[i];
            if (configLink.partsLen <= urlPartsLen) {
                this.fillMatchedUrlParts(segments, urlParts, configLink);
            }
        }
        // remove all the undefined segments
        for (var i = urlPartsLen - 1; i >= 0; i--) {
            if (segments[i] === undefined) {
                if (urlParts[i] === undefined) {
                    // not a used part, so remove it
                    segments.splice(i, 1);
                }
                else {
                    // create an empty part
                    segments[i] = {
                        id: urlParts[i],
                        name: urlParts[i],
                        component: null,
                        data: null
                    };
                }
            }
        }
        return segments;
    };
    UrlSerializer.prototype.fillMatchedUrlParts = function (segments, urlParts, configLink) {
        var _loop_1 = function (i) {
            var urlI = i;
            var partParts = urlParts[i] ? urlParts[i].split("?") : [];
            var part = partParts.length > 0 ? partParts[0] : undefined;
            var query = partParts.length > 1 ? partParts[1] : undefined;
            for (var j = 0; j < configLink.partsLen; j++) {
                if (part === configLink.parts[j]) {
                    urlI++;
                }
                else {
                    break;
                }
            }
            if ((urlI - i) === configLink.partsLen) {
                var matchedUrlParts = urlParts.slice(i, urlI);
                for (var j = i; j < urlI; j++) {
                    urlParts[j] = undefined;
                }
                var data_1 = undefined;
                if (query) {
                    var params = new URLSearchParams(query);
                    params.paramsMap.forEach(function (value, index) {
                        if (value) {
                            if (!data_1)
                                data_1 = {};
                            if (value.length == 1) {
                                data_1[index] = value[0];
                            }
                            else {
                                data_1[index] = value;
                            }
                        }
                    });
                }
                segments[i] = {
                    id: matchedUrlParts.join('/'),
                    name: configLink.name,
                    component: configLink.component,
                    data: data_1,
                    defaultHistory: configLink.defaultHistory
                };
            }
        };
        for (var i = 0; i < urlParts.length; i++) {
            _loop_1(i);
        }
    };
    UrlSerializer.prototype.parse = function (browserUrl) {
        if (browserUrl.charAt(0) === '/') {
            browserUrl = browserUrl.substr(1);
        }
        return this.parseUrlParts(browserUrl.split('/'));
    };
    return UrlSerializer;
}(IonicUrlSerializer));
export { UrlSerializer };
export var URL_SERIALIZER_PROVIDER = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [DeepLinkConfigToken]
};
export var urlSerializerProvider = {
    provide: IonicUrlSerializer,
    useFactory: UrlSerializer.setupUrlSerializer,
    deps: [DeepLinkConfigToken]
};
//# sourceMappingURL=url-serializer.js.map