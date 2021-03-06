import { OpaqueToken } from "@angular/core";
import { UrlSerializer as IonicUrlSerializer, DeepLinkConfig } from "ionic-angular";
import { NavLink, NavSegment } from "ionic-angular/navigation/nav-util";
/**
 * Implementation of ionic's UrlSerializer, that add page params as query
 * params, instead of path, e.g. "/page/subpage?param1=value".
 *
 * Additionaly it allows to use subarrays in DeepLinkConfig links, which is
 * helpful when AoT compilation is used.
 */
export declare class UrlSerializer extends IonicUrlSerializer {
    static setupUrlSerializer(config: DeepLinkConfig): IonicUrlSerializer;
    _createSegment(configLink: NavLink, data: any): NavSegment;
    parseUrlParts(urlParts: string[]): NavSegment[];
    fillMatchedUrlParts(segments: NavSegment[], urlParts: string[], configLink: NavLink): void;
    parse(browserUrl: string): NavSegment[];
}
export declare const URL_SERIALIZER_PROVIDER: {
    provide: typeof IonicUrlSerializer;
    useFactory: (config: DeepLinkConfig) => IonicUrlSerializer;
    deps: OpaqueToken[];
};
export declare const urlSerializerProvider: {
    provide: typeof IonicUrlSerializer;
    useFactory: (config: DeepLinkConfig) => IonicUrlSerializer;
    deps: OpaqueToken[];
};
