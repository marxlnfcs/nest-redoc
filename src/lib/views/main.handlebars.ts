/** @internal */
export const HANDLEBARS_MAIN = `
    <!DOCTYPE html>
    <html lang="">
        <head>

            <!-- Core tags -->
            <title>{{ data.title }}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <meta charset="utf-8" />
    
            <!-- Favicon -->
						{{#if data.favicon }}
							<link rel="shortcut icon" type="image/x-icon" href="{{ data.urls.favicon }}" />
						{{/if}}
    
            <!-- Styles -->
            {{ data.components.styles }}
    
        </head>
        <body> 
          <div id="redoc"></div>
          {{ data.components.scripts }}
        </body>
    </html>
`;