/*********************************************************************************************************/
/**
 * inserthtml plugin for CKEditor 3.x (Author: Lajox ; Email: lajox@19www.com)
 * version:	 1.0
 * Released: On 2009-12-11
 * Download: http://code.google.com/p/lajox
 */
/*********************************************************************************************************/

CKEDITOR.plugins.add( 'blockimagepaste',
{
	init : function( editor )
	{
		function replaceImgText(html) {
			return html.replace( /<img[^>]*src="data:image\/(bmp|dds|gif|jpg|jpeg|png|psd|pspimage|tga|thm|tif|tiff|yuv|ai|eps|ps|svg);base64,.*?"[^>]*>/gi, function( img ){
				return '';
			});
		}
		
		function chkImg() {
			// don't execute code if the editor is readOnly
			if (editor.readOnly)
				return;
			
			setTimeout( function() {
				editor.document.$.body.innerHTML = replaceImgText(editor.document.$.body.innerHTML);
			},100);
		}
		
		editor.on( 'contentDom', function() {
			// For Firefox
			editor.document.on('drop', chkImg);
			// For IE
			editor.document.getBody().on('drop', chkImg);
		});
		
		editor.on( 'paste', function(e) {
			var html = e.data.dataValue;
			if (!html)
				return;
			
			e.data.dataValue = replaceImgText(html);
		});
	} //Init
} );