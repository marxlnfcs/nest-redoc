import {RedocTheme} from "./redoc-theme.interface";

export interface RedocOptions {

	/**
	 * Sets the redoc version that should be used through the ReDoc CDN
	 * @see https://github.com/Redocly/redoc/tags
	 *
	 * @example v2.1.2
	 * @default latest
	 */
	redocVersion: string;

	/**
	 * Frontend Title (e.g: Cats)
	 */
	title: string;

	/**
	 * Frontend Favicon URL or Buffer
	 */
	favicon: string|Buffer|null;

	/**
	 * Logo options
	 */
	logo: RedocLogoOptions;

	/**
	 * Custom theme options for the ReDoc frontend
	 * @see https://redocly.com/docs/redoc/config/#theme-settings
	 */
	theme: RedocTheme;

	/**
	 * Disables search indexing and hides the search box from the API documentation page.
	 * @see https://redocly.com/docs/redoc/config/#disablesearch
	 *
	 * @default false
	 */
	disableSearch: boolean;

	/**
	 * Sets the minimum amount of characters that need to be typed into the search dialog to initiate the search.
	 * @see https://redocly.com/docs/redoc/config/#mincharacterlengthtoinitsearch
	 *
	 * @default 3
	 */
	minCharacterLengthToInitSearch: number;

	/**
	 * Enables or disables expanding default server variables.
	 * @see https://redocly.com/docs/redoc/config/#expanddefaultservervariables
	 *
	 * @default false
	 */
	expandDefaultServerVariables: boolean;

	/**
	 * Controls which responses to expand by default. Specify one or more responses by providing their response codes as a comma-separated list without spaces, for example expandResponses='200,201'. Special value 'all' expands all responses by default.
	 * Be careful: this option can slow down documentation rendering time.
	 * @see https://redocly.com/docs/redoc/config/#expandresponses
	 */
	expandResponses: string[];

	/**
	 * Automatically expands the single field in a schema.
	 * @see https://redocly.com/docs/redoc/config/#expandsingleschemafield
	 *
	 * @default false
	 */
	expandSingleSchemaField: boolean;

	/**
	 * Hides the 'Download' button for saving the API definition source file. This setting does not make the API definition private; it just hides the button.
	 * @see https://redocly.com/docs/redoc/config/#hidedownloadbutton
	 *
	 * @default false
	 */
	hideDownloadButton: boolean;

	/**
	 * If set to true, the protocol and hostname are not shown in the operation definition.
	 * @see https://redocly.com/docs/redoc/config/#hidehostname
	 *
	 * @default false
	 */
	hideHostname: boolean;

	/**
	 * Hides the loading animation. Does not apply to CLI or Workflows-rendered docs.
	 * @see https://redocly.com/docs/redoc/config/#hideloading
	 *
	 * @default false
	 */
	hideLoading: boolean;

	/**
	 * Hides request payload examples.
	 * @see https://redocly.com/docs/redoc/config/#hiderequestpayloadsample
	 *
	 * @default false
	 */
	hideRequestPayloadSample: boolean;

	/**
	 * If set to true, the description for oneOf/anyOf object is not shown in the schema.
	 * @see https://redocly.com/docs/redoc/config/#hideoneofdescription
	 *
	 * @default false
	 */
	hideOneOfDescription: boolean;

	/**
	 * If set to true, the pattern is not shown in the schema.
	 * @see https://redocly.com/docs/redoc/config/#hideschemapattern
	 *
	 * @default false
	 */
	hideSchemaPattern: boolean;

	/**
	 * Hides the schema titles next to the type.
	 * @see https://redocly.com/docs/redoc/config/#hideschematitles
	 *
	 * @default false
	 */
	hideSchemaTitles: boolean;

	/**
	 * Hides the Security panel section.
	 * @see https://redocly.com/docs/redoc/config/#hidesecuritysection
	 *
	 * @default false
	 */
	hideSecuritySection: boolean;

	/**
	 * Hides the request sample tab for requests with only one sample.
	 * @see https://redocly.com/docs/redoc/config/#hidesinglerequestsampletab
	 *
	 * @default false
	 */
	hideSingleRequestSampleTab: boolean;

	/**
	 * Sets the default expand level for JSON payload samples (response and request body). The default value is 2, and the maximum supported value is '+Infinity'. It can also be configured as a string with the special value all that expands all levels.
	 * @see https://redocly.com/docs/redoc/config/#jsonsampleexpandlevel
	 *
	 * @default 2
	 */
	jsonSampleExpandLevel: number|string;

	/**
	 * Displays only the specified number of enum values. The remaining values are hidden in an expandable area. If not set, all values are displayed.
	 * @see https://redocly.com/docs/redoc/config/#maxdisplayedenumvalues
	 *
	 * @default null
	 */
	maxDisplayedEnumValues: number|null;

	/**
	 * If set to true, selecting an expanded item in the sidebar twice collapses it.
	 * @see https://redocly.com/docs/redoc/config/#menutoggle
	 *
	 * @default true
	 */
	menuToggle: boolean;

	/**
	 * If set to true, the sidebar uses the native scrollbar instead of perfect-scroll. This setting is a scrolling performance optimization for big API definitions.
	 * @see https://redocly.com/docs/redoc/config/#nativescrollbars
	 *
	 * @default false
	 */
	nativeScrollbars: boolean;

	/**
	 * Shows only required fields in request samples.
	 * @see https://redocly.com/docs/redoc/config/#onlyrequiredinsamples
	 *
	 * @default false
	 */
	onlyRequiredInSamples: boolean;

	/**
	 * Shows the path link and HTTP verb in the middle panel instead of the right panel.
	 * @see https://redocly.com/docs/redoc/config/#pathinmiddlepanel
	 *
	 * @default false
	 */
	pathInMiddlePanel: boolean;

	/**
	 * If set, the payload sample is inserted at the specified index. If there are N payload samples and the value configured here is bigger than N, the payload sample is inserted last. Indexes start from 0.
	 * @see https://redocly.com/docs/redoc/config/#payloadsampleidx
	 */
	payloadSampleIdx: any;

	/**
	 * Shows required properties in schemas first, ordered in the same order as in the required array.
	 * @see https://redocly.com/docs/redoc/config/#requiredpropsfirst
	 *
	 * @default false
	 */
	requiredPropsFirst: boolean;

	/**
	 * Specifies whether to automatically expand schemas in Reference docs. Set it to all to expand all schemas regardless of their level, or set it to a number to expand schemas up to the specified level. For example, schemaExpansionLevel: 3 expands schemas up to three levels deep. The default value is 0, meaning no schemas are expanded automatically.
	 * @see https://redocly.com/docs/redoc/config/#schemaexpansionlevel
	 *
	 * @default 0
	 */
	schemaExpansionLevel: number|'all';

	/**
	 * Specifies a vertical scroll-offset. This setting is useful when there are fixed positioned elements at the top of the page, such as navbars, headers, etc.
	 *
	 * Note that you can specify the scrollYOffset value in any of the following ways:
	 *
	 * > as a number - a fixed number of pixels to be used as the offset.
	 * > as a CSS selector - the selector of the element to be used for specifying the offset. The distance from the top of the page to the element's bottom is used as the offset.
	 * > a function (advanced) - a getter function. Must return a number representing the offset (in pixels).
	 * @see https://redocly.com/docs/redoc/config/#scrollyoffset
	 *
	 */
	scrollYOffset: any;

	/**
	 * Shows specification extensions ('x-' fields). Extensions used by Redoc are ignored. The value can be boolean or an array of strings with names of extensions to display. When used as boolean and set to true, all specification extensions are shown.
	 * @see https://redocly.com/docs/redoc/config/#showextensions
	 *
	 * @default false
	 */
	showExtensions: boolean|string[];

	/**
	 * Shows object schema example in the properties; default false.
	 * @see https://redocly.com/docs/redoc/config/#showobjectschemaexamples
	 *
	 * @default false
	 */
	showObjectSchemaExamples: boolean;

	/**
	 * When set to true, shows the HTTP request method for webhooks in operations and in the sidebar.
	 * @see https://redocly.com/docs/redoc/config/#showwebhookverb
	 *
	 * @default false
	 */
	showWebhookVerb: boolean;

	/**
	 * Shows only unique oneOf types in the label without titles.
	 * @see https://redocly.com/docs/redoc/config/#simpleoneoftypelabel
	 *
	 * @default false
	 */
	simpleOneOfTypeLabel: boolean;

	/**
	 * When set to true, sorts all enum values in all schemas alphabetically.
	 * @see https://redocly.com/docs/redoc/config/#sortenumvaluesalphabetically
	 *
	 * @default false
	 */
	sortEnumValuesAlphabetically: boolean;

	/**
	 * When set to true, sorts operations in the navigation sidebar and in the middle panel alphabetically.
	 * @see https://redocly.com/docs/redoc/config/#sortoperationsalphabetically
	 *
	 * @default false
	 */
	sortOperationsAlphabetically: boolean;

	/**
	 * When set to true, sorts properties in all schemas alphabetically.
	 * @see https://redocly.com/docs/redoc/config/#sortpropsalphabetically
	 *
	 * @default false
	 */
	sortPropsAlphabetically: boolean;

	/**
	 * When set to true, sorts tags in the navigation sidebar and in the middle panel alphabetically. Note that only tags are sorted alphabetically in the middle panel, not the operations associated with each tag.
	 * To sort operations alphabetically as well, you must set the sortOperationsAlphabetically setting to true.
	 * @see https://redocly.com/docs/redoc/config/#sorttagsalphabetically
	 *
	 * @requires sortOperationsAlphabetically true
	 * @default false
	 */
	sortTagsAlphabetically: boolean;

	/**
	 * If set to true, the API definition is considered untrusted and all HTML/Markdown is sanitized to prevent XSS.
	 * @see https://redocly.com/docs/redoc/config/#untrusteddefinition
	 *
	 * @default false
	 */
	untrustedDefinition: boolean;

	/**
	 * Disables the Authorization panel that gets created by default
	 *
	 * @default false
	 */
	disableAutoAuthorization: boolean;

	/**
	 * Defines the tagGroups
	 */
	tagGroups: RedocTagGroupOptions;

}

export interface RedocLogoOptions {

	/**
	 * Defines the url of the logo that should be displayed on the frontend. Must be in the format of a URL and has to be absolute
	 */
	url: string|Buffer;

	/**
	 * HEX Color that should be used for the background
	 */
	backgroundColor: string;

	/**
	 * Alt text for the logo
	 */
	altText: string;

	/**
	 * href attribute for the logo
	 * @default self
	 */
	href: string;

}

export interface RedocTagGroupOptions {

	/**
	 * Name of the tagGroup
	 */
	name: string;

	/**
	 * All tags that are assigned to this tagGroup
	 */
	tags: string[];

}