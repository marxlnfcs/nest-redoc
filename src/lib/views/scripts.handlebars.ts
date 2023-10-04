/** @internal */
export const HANDLEBARS_SCRIPTS = `

	 <!-- Include the redoc library from the cdn -->
   <script src="https://cdn.jsdelivr.net/npm/redoc@{{ data.redocVersion }}/bundles/redoc.standalone.js"> </script>
   
   <!-- Initialize redoc -->
   <script>
	    document.addEventListener('DOMContentLoaded', () => {
	      Redoc.init('{{data.urls.definitions}}', JSON.parse(atob('{{ data.optionsB64Json }}')), document.getElementById('redoc'));
	    }, false);
	 </script>
   
`;