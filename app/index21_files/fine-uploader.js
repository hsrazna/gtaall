var qq=function(a){return{hide:function(){a.style.display="none";return this},attach:function(b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c);return function(){qq(a).detach(b,c)}},detach:function(b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.attachEvent&&a.detachEvent("on"+b,c);return this},contains:function(b){return a===b?!0:a.contains?a.contains(b):!!(b.compareDocumentPosition(a)&8)},insertBefore:function(b){b.parentNode.insertBefore(a,b);    return this},remove:function(){a.parentNode.removeChild(a);return this},css:function(b){null!==b.opacity&&("string"!==typeof a.style.opacity&&"undefined"!==typeof a.filters)&&(b.filter="alpha(opacity="+Math.round(100*b.opacity)+")");qq.extend(a.style,b);return this},hasClass:function(b){return RegExp("(^| )"+b+"( |$)").test(a.className)},addClass:function(b){qq(a).hasClass(b)||(a.className+=" "+b);return this},removeClass:function(b){a.className=a.className.replace(RegExp("(^| )"+b+"( |$)")," ").replace(/^\s+|\s+$/g,    "");return this},getByClass:function(b){var c,d=[];if(a.querySelectorAll)return a.querySelectorAll("."+b);c=a.getElementsByTagName("*");qq.each(c,function(a,c){qq(c).hasClass(b)&&d.push(c)});return d},children:function(){for(var b=[],c=a.firstChild;c;)1===c.nodeType&&b.push(c),c=c.nextSibling;return b},setText:function(b){a.innerText=b;a.textContent=b;return this},clearText:function(){return qq(a).setText("")}}};qq.log=function(a,b){if(window.console)if(!b||"info"===b)window.console.log(a);else if(window.console[b])window.console[b](a);else window.console.log("<"+b+"> "+a)};qq.isObject=function(a){return null!==a&&a&&"object"===typeof a&&a.constructor===Object};qq.isFunction=function(a){return"function"===typeof a};qq.isFileOrInput=function(a){if(window.File&&a instanceof File)return!0;if(window.HTMLInputElement){if(a instanceof HTMLInputElement&&a.type&&"file"===a.type.toLowerCase())return!0}else if(a.tagName&&"input"===a.tagName.toLowerCase()&&a.type&&"file"===a.type.toLowerCase())return!0;return!1};qq.isXhrUploadSupported=function(){var a=document.createElement("input");a.type="file";return void 0!==a.multiple&&"undefined"!==typeof File&&"undefined"!==typeof FormData&&"undefined"!==typeof(new XMLHttpRequest).upload};qq.isFolderDropSupported=function(a){return a.items&&a.items[0].webkitGetAsEntry};qq.extend=function(a,b,c){qq.each(b,function(b,e){c&&qq.isObject(e)?(void 0===a[b]&&(a[b]={}),qq.extend(a[b],e,!0)):a[b]=e})};qq.indexOf=function(a,b,c){if(a.indexOf)return a.indexOf(b,c);var c=c||0,d=a.length;0>c&&(c+=d);for(null;c<d;c+=1)if(a.hasOwnProperty(c)&&a[c]===b)return c;return-1};qq.getUniqueId=function(){var a=-1;return function(){return a+=1}}();qq.ie=function(){return-1!==navigator.userAgent.indexOf("MSIE")};qq.ie10=function(){return-1!==navigator.userAgent.indexOf("MSIE 10")};qq.safari=function(){return void 0!==navigator.vendor&&-1!==navigator.vendor.indexOf("Apple")};qq.chrome=function(){return void 0!==navigator.vendor&&-1!==navigator.vendor.indexOf("Google")};qq.firefox=function(){return-1!==navigator.userAgent.indexOf("Mozilla")&&void 0!==navigator.vendor&&""===navigator.vendor};qq.windows=function(){return"Win32"===navigator.platform};qq.preventDefault=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};qq.toElement=function(){var a=document.createElement("div");return function(b){a.innerHTML=b;b=a.firstChild;a.removeChild(b);return b}}();qq.each=function(a,b){var c,d;if(a)for(c in a)if(Object.prototype.hasOwnProperty.call(a,c)&&(d=b(c,a[c]),!1===d))break};qq.obj2url=function(a,b,c){var d,e=[],g="&",f=function(a,c){var d=b?/\[\]$/.test(b)?b:b+"["+c+"]":c;"undefined"!==d&&"undefined"!==c&&e.push("object"===typeof a?qq.obj2url(a,d,!0):"[object Function]"===Object.prototype.toString.call(a)?encodeURIComponent(d)+"="+encodeURIComponent(a()):encodeURIComponent(d)+"="+encodeURIComponent(a))};if(!c&&b)g=/\?/.test(b)?/\?$/.test(b)?"":"&":"?",e.push(b),e.push(qq.obj2url(a));else if("[object Array]"===Object.prototype.toString.call(a)&&"undefined"!==typeof a){d=    -1;for(c=a.length;d<c;d+=1)f(a[d],d)}else if("undefined"!==typeof a&&null!==a&&"object"===typeof a)for(d in a)a.hasOwnProperty(d)&&f(a[d],d);else e.push(encodeURIComponent(b)+"="+encodeURIComponent(a));return b?e.join(g):e.join(g).replace(/^&/,"").replace(/%20/g,"+")};qq.obj2FormData=function(a,b,c){b||(b=new FormData);qq.each(a,function(a,e){a=c?c+"["+a+"]":a;qq.isObject(e)?qq.obj2FormData(e,b,a):qq.isFunction(e)?b.append(encodeURIComponent(a),encodeURIComponent(e())):b.append(encodeURIComponent(a),encodeURIComponent(e))});return b};qq.obj2Inputs=function(a,b){var c;b||(b=document.createElement("form"));qq.obj2FormData(a,{append:function(a,e){c=document.createElement("input");c.setAttribute("name",a);c.setAttribute("value",e);b.appendChild(c)}});return b};qq.DisposeSupport=function(){var a=[];return{dispose:function(){var b;do(b=a.shift())&&b();while(b)},attach:function(){this.addDisposer(qq(arguments[0]).attach.apply(this,Array.prototype.slice.call(arguments,1)))},addDisposer:function(b){a.push(b)}}};qq.UploadButton=function(a){this._options={element:null,multiple:!1,acceptFiles:null,name:"file",onChange:function(){},hoverClass:"qq-upload-button-hover",focusClass:"qq-upload-button-focus"};qq.extend(this._options,a);this._disposeSupport=new qq.DisposeSupport;this._element=this._options.element;qq(this._element).css({position:"relative",overflow:"hidden",direction:"ltr"});this._input=this._createInput()};qq.UploadButton.prototype={getInput:function(){return this._input},reset:function(){this._input.parentNode&&qq(this._input).remove();qq(this._element).removeClass(this._options.focusClass);this._input=this._createInput()},_createInput:function(){var a=document.createElement("input");this._options.multiple&&a.setAttribute("multiple","multiple");this._options.acceptFiles&&a.setAttribute("accept",this._options.acceptFiles);a.setAttribute("type","file");a.setAttribute("name",this._options.name);qq(a).css({position:"absolute",    right:0,top:0,fontFamily:"Arial",fontSize:"118px",margin:0,padding:0,cursor:"pointer",opacity:0});this._element.appendChild(a);var b=this;this._disposeSupport.attach(a,"change",function(){b._options.onChange(a)});this._disposeSupport.attach(a,"mouseover",function(){qq(b._element).addClass(b._options.hoverClass)});this._disposeSupport.attach(a,"mouseout",function(){qq(b._element).removeClass(b._options.hoverClass)});this._disposeSupport.attach(a,"focus",function(){qq(b._element).addClass(b._options.focusClass)});    this._disposeSupport.attach(a,"blur",function(){qq(b._element).removeClass(b._options.focusClass)});window.attachEvent&&a.setAttribute("tabIndex","-1");return a}};qq.FineUploaderBasic=function(a){this._options={debug:!1,button:null,multiple:!0,maxConnections:3,disableCancelForFormUploads:!1,autoUpload:!0,request:{endpoint:"/server/upload",params:{},paramsInBody:!1,customHeaders:{},forceMultipart:!1,inputName:"qqfile"},validation:{allowedExtensions:[],sizeLimit:0,minSizeLimit:0,stopOnFirstInvalidFile:!0},callbacks:{onSubmit:function(){},onComplete:function(){},onCancel:function(){},onUpload:function(){},onProgress:function(){},onError:function(){},onAutoRetry:function(){},    onManualRetry:function(){},onValidate:function(){}},messages:{typeError:"{file} has an invalid extension. Valid extension(s): {extensions}.",sizeError:"{file} is too large, maximum file size is {sizeLimit}.",minSizeError:"{file} is too small, minimum file size is {minSizeLimit}.",emptyError:"{file} is empty, please select files again without it.",noFilesError:"No files to upload.",onLeave:"The files are being uploaded, if you leave now the upload will be cancelled."},retry:{enableAuto:!1,maxAutoAttempts:3,    autoAttemptDelay:5,preventRetryResponseProperty:"preventRetry"},classes:{buttonHover:"qq-upload-button-hover",buttonFocus:"qq-upload-button-focus"}};qq.extend(this._options,a,!0);this._wrapCallbacks();this._disposeSupport=new qq.DisposeSupport;this._filesInProgress=0;this._storedFileIds=[];this._autoRetries=[];this._retryTimeouts=[];this._preventRetries=[];this._paramsStore=this._createParamsStore();this._handler=this._createUploadHandler();this._options.button&&(this._button=this._createUploadButton(this._options.button));    this._preventLeaveInProgress()};qq.FineUploaderBasic.prototype={log:function(a,b){this._options.debug&&(!b||"info"===b)?qq.log("[FineUploader] "+a):b&&"info"!==b&&qq.log("[FineUploader] "+a,b)},setParams:function(a,b){void 0===b?this._options.request.params=a:this._paramsStore.setParams(a,b)},getInProgress:function(){return this._filesInProgress},uploadStoredFiles:function(){for(;this._storedFileIds.length;)this._filesInProgress++,this._handler.upload(this._storedFileIds.shift())},clearStoredFiles:function(){this._storedFileIds=[]},    retry:function(a){return this._onBeforeManualRetry(a)?(this._handler.retry(a),!0):!1},cancel:function(a){this._handler.cancel(a)},reset:function(){this.log("Resetting uploader...");this._handler.reset();this._filesInProgress=0;this._storedFileIds=[];this._autoRetries=[];this._retryTimeouts=[];this._preventRetries=[];this._button.reset();this._paramsStore.reset()},addFiles:function(a){var b=[],c,d;if(a){if(!window.FileList||!(a instanceof FileList))a=[].concat(a);for(c=0;c<a.length;c+=1)d=a[c],qq.isFileOrInput(d)?        b.push(d):this.log(d+" is not a File or INPUT element!  Ignoring!","warn");this.log("Processing "+b.length+" files or inputs...");this._uploadFileList(b)}},_createUploadButton:function(a){var b=this,c=new qq.UploadButton({element:a,multiple:this._options.multiple&&qq.isXhrUploadSupported(),acceptFiles:this._options.validation.acceptFiles,onChange:function(a){b._onInputChange(a)},hoverClass:this._options.classes.buttonHover,focusClass:this._options.classes.buttonFocus});this._disposeSupport.addDisposer(function(){c.dispose()});        return c},_createUploadHandler:function(){var a=this,b;b=qq.isXhrUploadSupported()?"UploadHandlerXhr":"UploadHandlerForm";return new qq[b]({debug:this._options.debug,endpoint:this._options.request.endpoint,forceMultipart:this._options.request.forceMultipart,maxConnections:this._options.maxConnections,customHeaders:this._options.request.customHeaders,inputName:this._options.request.inputName,demoMode:this._options.demoMode,log:this.log,paramsInBody:this._options.request.paramsInBody,paramsStore:this._paramsStore,        onProgress:function(b,d,e,g){a._onProgress(b,d,e,g);a._options.callbacks.onProgress(b,d,e,g)},onComplete:function(b,d,e,g){a._onComplete(b,d,e,g);a._options.callbacks.onComplete(b,d,e)},onCancel:function(b,d){a._onCancel(b,d);a._options.callbacks.onCancel(b,d)},onUpload:function(b,d,e){a._onUpload(b,d,e);a._options.callbacks.onUpload(b,d,e)},onAutoRetry:function(b,d,e,g){a._preventRetries[b]=e[a._options.retry.preventRetryResponseProperty];return a._shouldAutoRetry(b,d,e)?(a._maybeParseAndSendUploadError(b,            d,e,g),a._options.callbacks.onAutoRetry(b,d,a._autoRetries[b]+1),a._onBeforeAutoRetry(b,d),a._retryTimeouts[b]=setTimeout(function(){a._onAutoRetry(b,d,e)},1E3*a._options.retry.autoAttemptDelay),!0):!1}})},_preventLeaveInProgress:function(){var a=this;this._disposeSupport.attach(window,"beforeunload",function(b){if(a._filesInProgress)return b=b||window.event,b.returnValue=a._options.messages.onLeave})},_onSubmit:function(){this._options.autoUpload&&this._filesInProgress++},_onProgress:function(){},    _onComplete:function(a,b,c,d){this._filesInProgress--;this._maybeParseAndSendUploadError(a,b,c,d)},_onCancel:function(a){clearTimeout(this._retryTimeouts[a]);a=qq.indexOf(this._storedFileIds,a);this._options.autoUpload||0>a?this._filesInProgress--:this._options.autoUpload||this._storedFileIds.splice(a,1)},_onUpload:function(){},_onInputChange:function(a){this._handler instanceof qq.UploadHandlerXhr?this.addFiles(a.files):this._validateFile(a)&&this.addFiles(a);this._button.reset()},_onBeforeAutoRetry:function(a,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       b){this.log("Waiting "+this._options.retry.autoAttemptDelay+" seconds before retrying "+b+"...")},_onAutoRetry:function(a,b){this.log("Retrying "+b+"...");this._autoRetries[a]++;this._handler.retry(a)},_shouldAutoRetry:function(a){return!this._preventRetries[a]&&this._options.retry.enableAuto?(void 0===this._autoRetries[a]&&(this._autoRetries[a]=0),this._autoRetries[a]<this._options.retry.maxAutoAttempts):!1},_onBeforeManualRetry:function(a){if(this._preventRetries[a])return this.log("Retries are forbidden for id "+        a,"warn"),!1;if(this._handler.isValid(a)){var b=this._handler.getName(a);if(!1===this._options.callbacks.onManualRetry(a,b))return!1;this.log("Retrying upload for '"+b+"' (id: "+a+")...");this._filesInProgress++;return!0}this.log("'"+a+"' is not a valid file ID","error");return!1},_maybeParseAndSendUploadError:function(a,b,c,d){if(!c.success)if(d&&200!==d.status&&!c.error)this._options.callbacks.onError(a,b,"XHR returned response code "+d.status);else this._options.callbacks.onError(a,b,c.error?c.error:        "Upload failure reason unknown")},_uploadFileList:function(a){var b;if(!1!==this._options.callbacks.onValidate(this._getValidationDescriptors(a)))if(0<a.length)for(b=0;b<a.length;b++)if(this._validateFile(a[b]))this._uploadFile(a[b]);else{if(this._options.validation.stopOnFirstInvalidFile)break}else this._error("noFilesError","")},_uploadFile:function(a){var a=this._handler.add(a),b=this._handler.getName(a);!1!==this._options.callbacks.onSubmit(a,b)&&(this._onSubmit(a,b),this._options.autoUpload?        this._handler.upload(a):this._storeFileForLater(a))},_storeFileForLater:function(a){this._storedFileIds.push(a)},_validateFile:function(a){var b,c,a=this._getValidationDescriptor(a);b=a.name;c=a.size;if(!1===this._options.callbacks.onValidate([a]))return!1;if(this._isAllowedExtension(b)){if(0===c)return this._error("emptyError",b),!1;if(c&&this._options.validation.sizeLimit&&c>this._options.validation.sizeLimit)return this._error("sizeError",b),!1;if(c&&c<this._options.validation.minSizeLimit)return this._error("minSizeError",        b),!1}else return this._error("typeError",b),!1;return!0},_error:function(a,b){var c=this._options.messages[a],d=this._options.validation.allowedExtensions.join(", "),e=this._formatFileName(b),c=c.replace("{file}",e),c=c.replace("{extensions}",d),d=this._formatSize(this._options.validation.sizeLimit),c=c.replace("{sizeLimit}",d),d=this._formatSize(this._options.validation.minSizeLimit),c=c.replace("{minSizeLimit}",d);this._options.callbacks.onError(null,b,c);return c},_formatFileName:function(a){33<        a.length&&(a=a.slice(0,19)+"..."+a.slice(-13));return a},_isAllowedExtension:function(a){var a=-1!==a.indexOf(".")?a.replace(/.*[.]/,"").toLowerCase():"",b=this._options.validation.allowedExtensions;if(!b.length)return!0;for(var c=0;c<b.length;c++)if(b[c].toLowerCase()==a)return!0;return!1},_formatSize:function(a){var b=-1;do a/=1024,b++;while(99<a);return Math.max(a,0.1).toFixed(1)+"kB MB GB TB PB EB".split(" ")[b]},_wrapCallbacks:function(){var a,b;a=this;b=function(b,c,g){try{return c.apply(a,        g)}catch(f){a.log("Caught exception in '"+b+"' callback - "+f,"error")}};for(var c in this._options.callbacks)(function(){var d,e;d=c;e=a._options.callbacks[d];a._options.callbacks[d]=function(){return b(d,e,arguments)}})()},_parseFileName:function(a){return a.value?a.value.replace(/.*(\/|\\)/,""):null!==a.fileName&&void 0!==a.fileName?a.fileName:a.name},_parseFileSize:function(a){var b;a.value||(b=null!==a.fileSize&&void 0!==a.fileSize?a.fileSize:a.size);return b},_getValidationDescriptor:function(a){var b,        c;c={};b=this._parseFileName(a);a=this._parseFileSize(a);c.name=b;a&&(c.size=a);return c},_getValidationDescriptors:function(a){var b,c;c=[];for(b=0;b<a.length;b++)c.push(a[b]);return c},_createParamsStore:function(){var a={},b=this;return{setParams:function(b,d){var e={};qq.extend(e,b);a[d]=e},getParams:function(c){var d={};void 0!==c&&a[c]?qq.extend(d,a[c]):qq.extend(d,b._options.request.params);return d},remove:function(b){return delete a[b]},reset:function(){a={}}}}};qq.DragAndDrop=function(a){function b(){k===l&&!i&&(f.callbacks.log("Grabbed "+j.length+" files after tree traversal."),h.dropDisabled(!1),f.callbacks.dropProcessing(!1,j))}function c(a){var d;k+=1;a.isFile?a.file(function(a){j.push(a);l+=1;b()}):a.isDirectory&&(i=!0,a=a.createReader(),a.readEntries(function(a){l+=1;for(d=0;d<a.length;d+=1)c(a[d]);i=!1;a.length||b()}))}function d(a){h=new qq.UploadDropZone({element:a,onEnter:function(b){qq(a).addClass(f.classes.dropActive);b.stopPropagation()},onLeaveNotDescendants:function(){qq(a).removeClass(f.classes.dropActive)},    onDrop:function(d){f.hideDropzones&&qq(a).hide();qq(a).removeClass(f.classes.dropActive);var d=d.dataTransfer,e,g;f.callbacks.dropProcessing(!0);h.dropDisabled(!0);if(1<d.files.length&&!f.multiple)f.callbacks.error("tooManyFilesError","");else if(j=[],l=k=0,qq.isFolderDropSupported(d)){e=d.items;for(d=0;d<e.length;d+=1)if(g=e[d].webkitGetAsEntry())g.isFile?(j.push(e[d].getAsFile()),d===e.length-1&&b()):c(g)}else f.callbacks.dropProcessing(!1,d.files),h.dropDisabled(!1)}});m.addDisposer(function(){h.dispose()});    f.hideDropzones&&qq(a).hide()}function e(a){var b;qq.each(a.dataTransfer.types,function(a,c){if("Files"===c)return b=!0,!1});return b}function g(){f.dropArea&&f.extraDropzones.push(f.dropArea);var a,b=f.extraDropzones;for(a=0;a<b.length;a+=1)d(b[a]);f.dropArea&&(!qq.ie()||qq.ie10())&&m.attach(document,"dragenter",function(c){if(!h.dropDisabled()&&e(c)&&!qq(f.dropArea).hasClass(f.classes.dropDisabled)){f.dropArea.style.display="block";for(a=0;a<b.length;a+=1)b[a].style.display="block"}});m.attach(document,    "dragleave",function(c){if(f.hideDropzones&&qq.FineUploader.prototype._leaving_document_out(c))for(a=0;a<b.length;a+=1)qq(b[a]).hide()});m.attach(document,"drop",function(c){if(f.hideDropzones)for(a=0;a<b.length;a+=1)qq(b[a]).hide();c.preventDefault()})}var f,h,i,j=[],k=0,l=0,m=new qq.DisposeSupport;f={dropArea:null,extraDropzones:[],hideDropzones:!0,multiple:!0,classes:{dropActive:null},callbacks:{dropProcessing:function(){},error:function(){},log:function(){}}};qq.extend(f,a);return{setup:function(){g()},    setupExtraDropzone:function(a){f.extraDropzones.push(a);d(a)},removeExtraDropzone:function(a){var b,c=f.extraDropzones;for(b in c)if(c[b]===a)return c.splice(b,1)},dispose:function(){m.dispose();h.dispose()}}};qq.UploadDropZone=function(a){function b(){return qq.safari()||qq.firefox()&&qq.windows()}function c(a){if(qq.ie()&&!qq.ie10())return!1;var b=a.dataTransfer,c=qq.safari(),a=qq.ie10()?!0:"none"!==b.effectAllowed;return b&&a&&(b.files||!c&&b.types.contains&&b.types.contains("Files"))}function d(a){void 0!==a&&(f=a);return f}var e,g,f,h,i=new qq.DisposeSupport;e={element:null,onEnter:function(){},onLeave:function(){},onLeaveNotDescendants:function(){},onDrop:function(){}};qq.extend(e,a);g=e.element;    (function(){h||(b?i.attach(document,"dragover",function(a){a.preventDefault()}):i.attach(document,"dragover",function(a){a.dataTransfer&&(a.dataTransfer.dropEffect="none",a.preventDefault())}),h=!0)})();(function(){i.attach(g,"dragover",function(a){if(c(a)){var b=qq.ie()?null:a.dataTransfer.effectAllowed;a.dataTransfer.dropEffect="move"===b||"linkMove"===b?"move":"copy";a.stopPropagation();a.preventDefault()}});i.attach(g,"dragenter",function(a){if(!d()&&c(a))e.onEnter(a)});i.attach(g,"dragleave",        function(a){if(c(a)){e.onLeave(a);var b=document.elementFromPoint(a.clientX,a.clientY);if(!qq(this).contains(b))e.onLeaveNotDescendants(a)}});i.attach(g,"drop",function(a){!d()&&c(a)&&(a.preventDefault(),e.onDrop(a))})})();return{dropDisabled:function(a){return d(a)},dispose:function(){i.dispose()}}};qq.FineUploader=function(a){qq.FineUploaderBasic.apply(this,arguments);qq.extend(this._options,{element:null,listElement:null,dragAndDrop:{extraDropzones:[],hideDropzones:!0,disableDefaultDropzone:!1},text:{uploadButton:"Upload a file",cancelButton:"Cancel",retryButton:"Retry",failUpload:"Upload failed",dragZone:"Drop files here to upload",dropProcessing:"Processing dropped files...",formatProgress:"{percent}% of {total_size}",waitingForResponse:"Processing..."},template:'<div class="qq-uploader">'+    (!this._options.dragAndDrop||!this._options.dragAndDrop.disableDefaultDropzone?'<div class="qq-upload-drop-area"><span>{dragZoneText}</span></div>':"")+(!this._options.button?'<div class="qq-upload-button"><div>{uploadButtonText}</div></div>':"")+'<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>'+(!this._options.listElement?'<ul class="qq-upload-list"></ul>':"")+"</div>",fileTemplate:'<li><div class="qq-progress-bar"></div><span class="qq-upload-spinner"></span><span class="qq-upload-finished"></span><span class="qq-upload-file"></span><span class="qq-upload-size"></span><a class="qq-upload-cancel" href="#">{cancelButtonText}</a><a class="qq-upload-retry" href="#">{retryButtonText}</a><span class="qq-upload-status-text">{statusText}</span></li>',    classes:{button:"qq-upload-button",drop:"qq-upload-drop-area",dropActive:"qq-upload-drop-area-active",dropDisabled:"qq-upload-drop-area-disabled",list:"qq-upload-list",progressBar:"qq-progress-bar",file:"qq-upload-file",spinner:"qq-upload-spinner",finished:"qq-upload-finished",retrying:"qq-upload-retrying",retryable:"qq-upload-retryable",size:"qq-upload-size",cancel:"qq-upload-cancel",retry:"qq-upload-retry",statusText:"qq-upload-status-text",success:"qq-upload-success",fail:"qq-upload-fail",successIcon:null,        failIcon:null,dropProcessing:"qq-drop-processing",dropProcessingSpinner:"qq-drop-processing-spinner"},failedUploadTextDisplay:{mode:"default",maxChars:50,responseProperty:"error",enableTooltip:!0},messages:{tooManyFilesError:"You may only drop one file"},retry:{showAutoRetryNote:!0,autoRetryNote:"Retrying {retryNum}/{maxAuto}...",showButton:!1},showMessage:function(a){alert(a)}},!0);qq.extend(this._options,a,!0);this._wrapCallbacks();this._options.template=this._options.template.replace(/\{dragZoneText\}/g,    this._options.text.dragZone);this._options.template=this._options.template.replace(/\{uploadButtonText\}/g,this._options.text.uploadButton);this._options.template=this._options.template.replace(/\{dropProcessingText\}/g,this._options.text.dropProcessing);this._options.fileTemplate=this._options.fileTemplate.replace(/\{cancelButtonText\}/g,this._options.text.cancelButton);this._options.fileTemplate=this._options.fileTemplate.replace(/\{retryButtonText\}/g,this._options.text.retryButton);this._options.fileTemplate=    this._options.fileTemplate.replace(/\{statusText\}/g,"");this._element=this._options.element;this._element.innerHTML=this._options.template;this._listElement=this._options.listElement||this._find(this._element,"list");this._classes=this._options.classes;this._button||(this._button=this._createUploadButton(this._find(this._element,"button")));this._bindCancelAndRetryEvents();this._dnd=this._setupDragAndDrop()};qq.extend(qq.FineUploader.prototype,qq.FineUploaderBasic.prototype);qq.extend(qq.FineUploader.prototype,{clearStoredFiles:function(){qq.FineUploaderBasic.prototype.clearStoredFiles.apply(this,arguments);this._listElement.innerHTML=""},addExtraDropzone:function(a){this._dnd.setupExtraDropzone(a)},removeExtraDropzone:function(a){return this._dnd.removeExtraDropzone(a)},getItemByFileId:function(a){for(var b=this._listElement.firstChild;b;){if(b.qqFileId==a)return b;b=b.nextSibling}},cancel:function(a){qq.FineUploaderBasic.prototype.cancel.apply(this,arguments);var b=    this.getItemByFileId(a);qq(b).remove()},reset:function(){qq.FineUploaderBasic.prototype.reset.apply(this,arguments);this._element.innerHTML=this._options.template;this._listElement=this._options.listElement||this._find(this._element,"list");this._options.button||(this._button=this._createUploadButton(this._find(this._element,"button")));this._bindCancelAndRetryEvents();this._dnd.dispose();this._dnd=this._setupDragAndDrop()},_setupDragAndDrop:function(){var a=this,b=this._find(this._element,"dropProcessing"),    c,d;d=function(a){a.preventDefault()};this._options.dragAndDrop.disableDefaultDropzone||(c=this._find(this._options.element,"drop"));c=new qq.DragAndDrop({dropArea:c,extraDropzones:this._options.dragAndDrop.extraDropzones,hideDropzones:this._options.dragAndDrop.hideDropzones,multiple:this._options.multiple,classes:{dropActive:this._options.classes.dropActive},callbacks:{dropProcessing:function(c,g){var f=a._button.getInput();c?(qq(b).css({display:"block"}),qq(f).attach("click",d)):(qq(b).hide(),qq(f).detach("click",    d));g&&a.addFiles(g)},error:function(b,c){a._error(b,c)},log:function(b,c){a.log(b,c)}}});c.setup();return c},_leaving_document_out:function(a){return(qq.chrome()||qq.safari()&&qq.windows())&&0==a.clientX&&0==a.clientY||qq.firefox()&&!a.relatedTarget},_storeFileForLater:function(a){qq.FineUploaderBasic.prototype._storeFileForLater.apply(this,arguments);var b=this.getItemByFileId(a);qq(this._find(b,"spinner")).hide()},_find:function(a,b){var c=qq(a).getByClass(this._options.classes[b])[0];if(!c)throw Error("element not found "+    b);return c},_onSubmit:function(a,b){qq.FineUploaderBasic.prototype._onSubmit.apply(this,arguments);this._addToList(a,b)},_onProgress:function(a,b,c,d){qq.FineUploaderBasic.prototype._onProgress.apply(this,arguments);var e,g,f,h;e=this.getItemByFileId(a);g=this._find(e,"progressBar");h=Math.round(100*(c/d));c===d?(f=this._find(e,"cancel"),qq(f).hide(),qq(g).hide(),qq(this._find(e,"statusText")).setText(this._options.text.waitingForResponse),f=this._formatSize(d)):(f=this._formatProgress(c,d),qq(g).css({display:"block"}));    qq(g).css({width:h+"%"});e=this._find(e,"size");qq(e).css({display:"inline"});qq(e).setText(f)},_onComplete:function(a,b,c,d){qq.FineUploaderBasic.prototype._onComplete.apply(this,arguments);var e=this.getItemByFileId(a);qq(this._find(e,"statusText")).clearText();qq(e).removeClass(this._classes.retrying);qq(this._find(e,"progressBar")).hide();(!this._options.disableCancelForFormUploads||qq.isXhrUploadSupported())&&qq(this._find(e,"cancel")).hide();qq(this._find(e,"spinner")).hide();c.success?(qq(e).addClass(this._classes.success),    this._classes.successIcon&&(this._find(e,"finished").style.display="inline-block",qq(e).addClass(this._classes.successIcon))):(qq(e).addClass(this._classes.fail),this._classes.failIcon&&(this._find(e,"finished").style.display="inline-block",qq(e).addClass(this._classes.failIcon)),this._options.retry.showButton&&!this._preventRetries[a]&&qq(e).addClass(this._classes.retryable),this._controlFailureTextDisplay(e,c))},_onUpload:function(a,b,c){qq.FineUploaderBasic.prototype._onUpload.apply(this,arguments);    this._showSpinner(this.getItemByFileId(a))},_onBeforeAutoRetry:function(a){var b,c,d,e,g;qq.FineUploaderBasic.prototype._onBeforeAutoRetry.apply(this,arguments);b=this.getItemByFileId(a);c=this._find(b,"progressBar");this._showCancelLink(b);c.style.width=0;qq(c).hide();this._options.retry.showAutoRetryNote&&(c=this._find(b,"statusText"),d=this._autoRetries[a]+1,e=this._options.retry.maxAutoAttempts,g=this._options.retry.autoRetryNote.replace(/\{retryNum\}/g,d),g=g.replace(/\{maxAuto\}/g,e),qq(c).setText(g),    1===d&&qq(b).addClass(this._classes.retrying))},_onBeforeManualRetry:function(a){if(qq.FineUploaderBasic.prototype._onBeforeManualRetry.apply(this,arguments)){var b=this.getItemByFileId(a);this._find(b,"progressBar").style.width=0;qq(b).removeClass(this._classes.fail);this._showSpinner(b);this._showCancelLink(b);return!0}return!1},_addToList:function(a,b){var c=qq.toElement(this._options.fileTemplate);if(this._options.disableCancelForFormUploads&&!qq.isXhrUploadSupported()){var d=this._find(c,"cancel");    qq(d).remove()}c.qqFileId=a;d=this._find(c,"file");qq(d).setText(this._formatFileName(b));qq(this._find(c,"size")).hide();this._options.multiple||this._clearList();this._listElement.appendChild(c)},_clearList:function(){this._listElement.innerHTML="";this.clearStoredFiles()},_bindCancelAndRetryEvents:function(){var a=this;this._disposeSupport.attach(this._listElement,"click",function(b){var b=b||window.event,c=b.target||b.srcElement;if(qq(c).hasClass(a._classes.cancel)||qq(c).hasClass(a._classes.retry)){qq.preventDefault(b);    for(b=c.parentNode;void 0==b.qqFileId;)b=c=c.parentNode;qq(c).hasClass(a._classes.cancel)?a.cancel(b.qqFileId):(qq(b).removeClass(a._classes.retryable),a.retry(b.qqFileId))}})},_formatProgress:function(a,b){var c=this._options.text.formatProgress,d=Math.round(100*(a/b)),c=c.replace("{percent}",d),d=this._formatSize(b);return c=c.replace("{total_size}",d)},_controlFailureTextDisplay:function(a,b){var c,d,e,g;c=this._options.failedUploadTextDisplay.mode;d=this._options.failedUploadTextDisplay.maxChars;    e=this._options.failedUploadTextDisplay.responseProperty;"custom"===c?((c=b[e])?c.length>d&&(g=c.substring(0,d)+"..."):(c=this._options.text.failUpload,this.log("'"+e+"' is not a valid property on the server response.","warn")),qq(this._find(a,"statusText")).setText(g||c),this._options.failedUploadTextDisplay.enableTooltip&&this._showTooltip(a,c)):"default"===c?qq(this._find(a,"statusText")).setText(this._options.text.failUpload):"none"!==c&&this.log("failedUploadTextDisplay.mode value of '"+c+"' is not valid",        "warn")},_showTooltip:function(a,b){a.title=b},_showSpinner:function(a){this._find(a,"spinner").style.display="inline-block"},_showCancelLink:function(a){if(!this._options.disableCancelForFormUploads||qq.isXhrUploadSupported())this._find(a,"cancel").style.display="inline"},_error:function(a,b){this._options.showMessage(qq.FineUploaderBasic.prototype._error.apply(this,arguments))}});qq.UploadHandlerAbstract=function(a){this._options={debug:!1,endpoint:"/upload.php",paramsInBody:!1,maxConnections:999,log:function(){},onProgress:function(){},onComplete:function(){},onCancel:function(){},onUpload:function(){},onAutoRetry:function(){}};qq.extend(this._options,a);this._queue=[];this.log=this._options.log};qq.UploadHandlerAbstract.prototype={add:function(){},upload:function(a){this._queue.push(a)<=this._options.maxConnections&&this._upload(a)},retry:function(a){0<=qq.indexOf(this._queue,a)?this._upload(a):this.upload(a)},cancel:function(a){this.log("Cancelling "+a);this._options.paramsStore.remove(a);this._cancel(a);this._dequeue(a)},cancelAll:function(){for(var a=0;a<this._queue.length;a++)this._cancel(this._queue[a]);this._queue=[]},getName:function(){},getSize:function(){},getQueue:function(){return this._queue},    reset:function(){this.log("Resetting upload handler");this._queue=[]},_upload:function(){},_cancel:function(){},_dequeue:function(a){a=qq.indexOf(this._queue,a);this._queue.splice(a,1);var b=this._options.maxConnections;this._queue.length>=b&&a<b&&this._upload(this._queue[b-1])},isValid:function(){}};qq.UploadHandlerForm=function(a){qq.UploadHandlerAbstract.apply(this,arguments);this._inputs={};this._detach_load_events={}};qq.extend(qq.UploadHandlerForm.prototype,qq.UploadHandlerAbstract.prototype);qq.extend(qq.UploadHandlerForm.prototype,{add:function(a){a.setAttribute("name",this._options.inputName);var b=qq.getUniqueId();this._inputs[b]=a;a.parentNode&&qq(a).remove();return b},getName:function(a){return this._inputs[a].value.replace(/.*(\/|\\)/,"")},isValid:function(a){return void 0!==this._inputs[a]},reset:function(){qq.UploadHandlerAbstract.prototype.reset.apply(this,arguments);this._inputs={};this._detach_load_events={}},_cancel:function(a){this._options.onCancel(a,this.getName(a));delete this._inputs[a];    delete this._detach_load_events[a];if(a=document.getElementById(a))a.setAttribute("src","javascript:false;"),qq(a).remove()},_upload:function(a){this._options.onUpload(a,this.getName(a),!1);var b=this._inputs[a];if(!b)throw Error("file with passed id was not added, or already uploaded or cancelled");var c=this.getName(a),d=this._createIframe(a),e=this._createForm(d,this._options.paramsStore.getParams(a));e.appendChild(b);var g=this;this._attachLoadEvent(d,function(){g.log("iframe loaded");var b=g._getIframeContentJSON(d);    setTimeout(function(){g._detach_load_events[a]();delete g._detach_load_events[a];qq(d).remove()},1);if(b.success||!g._options.onAutoRetry(a,c,b))g._options.onComplete(a,c,b),g._dequeue(a)});this.log("Sending upload request for "+a);e.submit();qq(e).remove();return a},_attachLoadEvent:function(a,b){var c=this;this._detach_load_events[a.id]=qq(a).attach("load",function(){c.log("Received response for "+a.id);if(a.parentNode){try{if(a.contentDocument&&a.contentDocument.body&&"false"==a.contentDocument.body.innerHTML)return}catch(d){c.log("Error when attempting to access iframe during handling of upload response ("+    d+")","error")}b()}})},_getIframeContentJSON:function(a){try{var b=a.contentDocument?a.contentDocument:a.contentWindow.document,c,d=b.body.innerHTML;this.log("converting iframe's innerHTML to JSON");this.log("innerHTML = "+d);d&&d.match(/^<pre/i)&&(d=b.body.firstChild.firstChild.nodeValue);c=eval("("+d+")")}catch(e){this.log("Error when attempting to parse form upload response ("+e+")","error"),c={success:!1}}return c},_createIframe:function(a){var b=qq.toElement('<iframe src="javascript:false;" name="'+    a+'" />');b.setAttribute("id",a);b.style.display="none";document.body.appendChild(b);return b},_createForm:function(a,b){var c=qq.toElement('<form method="'+(this._options.demoMode?"GET":"POST")+'" enctype="multipart/form-data"></form>'),d=this._options.endpoint;this._options.paramsInBody?qq.obj2Inputs(b,c):d=qq.obj2url(b,this._options.endpoint);c.setAttribute("action",d);c.setAttribute("target",a.name);c.style.display="none";document.body.appendChild(c);return c}});qq.UploadHandlerXhr=function(a){qq.UploadHandlerAbstract.apply(this,arguments);this._files=[];this._xhrs=[];this._loaded=[]};qq.extend(qq.UploadHandlerXhr.prototype,qq.UploadHandlerAbstract.prototype);qq.extend(qq.UploadHandlerXhr.prototype,{add:function(a){if(!(a instanceof File))throw Error("Passed obj in not a File (in qq.UploadHandlerXhr)");return this._files.push(a)-1},getName:function(a){a=this._files[a];return null!==a.fileName&&void 0!==a.fileName?a.fileName:a.name},getSize:function(a){a=this._files[a];return null!=a.fileSize?a.fileSize:a.size},getLoaded:function(a){return this._loaded[a]||0},isValid:function(a){return void 0!==this._files[a]},reset:function(){qq.UploadHandlerAbstract.prototype.reset.apply(this,    arguments);this._files=[];this._xhrs=[];this._loaded=[]},_upload:function(a){var b=this._files[a],c=this.getName(a);this.getSize(a);var d=this,e=this._options.endpoint,g=this._options.demoMode?"GET":"POST",f,h,i;this._options.onUpload(a,this.getName(a),!0);this._loaded[a]=0;f=this._xhrs[a]=new XMLHttpRequest;f.upload.onprogress=function(b){b.lengthComputable&&(d._loaded[a]=b.loaded,d._options.onProgress(a,c,b.loaded,b.total))};f.onreadystatechange=function(){4===f.readyState&&d._onComplete(a,f)};    i=this._options.paramsStore.getParams(a);this._options.paramsInBody||(i[this._options.inputName]=c,e=qq.obj2url(i,this._options.endpoint));f.open(g,e,!0);f.withCredentials=true;f.setRequestHeader("X-Requested-With","XMLHttpRequest");f.setRequestHeader("X-File-Name",encodeURIComponent(c));f.setRequestHeader("Cache-Control","no-cache");this._options.forceMultipart||this._options.paramsInBody?(e=new FormData,this._options.paramsInBody&&qq.obj2FormData(i,e),e.append(this._options.inputName,b),b=e):(f.setRequestHeader("Content-Type",        "application/octet-stream"),f.setRequestHeader("X-Mime-Type",b.type));for(h in this._options.customHeaders)this._options.customHeaders.hasOwnProperty(h)&&f.setRequestHeader(h,this._options.customHeaders[h]);this.log("Sending upload request for "+a);f.send(b)},_onComplete:function(a,b){if(this._files[a]){var c=this.getName(a),d=this.getSize(a),e;this._options.onProgress(a,c,d,d);this.log("xhr - server response received for "+a);this.log("responseText = "+b.responseText);try{e="function"===typeof JSON.parse?    JSON.parse(b.responseText):eval("("+b.responseText+")")}catch(g){this.log("Error when attempting to parse xhr response text ("+g+")","error"),e={}}if(200===b.status&&e.success||!this._options.onAutoRetry(a,c,e,b))this._options.onComplete(a,c,e,b),this._xhrs[a]=null,this._dequeue(a)}},_cancel:function(a){this._options.onCancel(a,this.getName(a));this._files[a]=null;this._xhrs[a]&&(this._xhrs[a].abort(),this._xhrs[a]=null)}});(function(a){var b,c,d,e,g,f,h,i,j,k;f=["uploaderType"];d=function(a){a&&(a=i(a),h(a),"basic"===g("uploaderType")?b(new qq.FineUploaderBasic(a)):b(new qq.FineUploader(a)));return c};e=function(a,b){var d=c.data("fineuploader");if(b)void 0===d&&(d={}),d[a]=b,c.data("fineuploader",d);else return void 0===d?null:d[a]};b=function(a){return e("uploader",a)};g=function(a,b){return e(a,b)};h=function(b){var d=b.callbacks={};a.each((new qq.FineUploaderBasic)._options.callbacks,function(a){var b,e;b=/^on(\w+)/.exec(a)[1];    b=b.substring(0,1).toLowerCase()+b.substring(1);e=c;d[a]=function(){var a=Array.prototype.slice.call(arguments);return e.triggerHandler(b,a)}})};i=function(b,d){var e,h;e=void 0===d?"basic"!==b.uploaderType?{element:c[0]}:{}:d;a.each(b,function(b,c){0<=a.inArray(b,f)?g(b,c):c instanceof a?e[b]=c[0]:a.isPlainObject(c)?(e[b]={},i(c,e[b])):a.isArray(c)?(h=[],a.each(c,function(b,c){c instanceof a?a.merge(h,c):h.push(c)}),e[b]=h):e[b]=c});if(void 0===d)return e};j=function(c){return"string"===a.type(c)&&    !c.match(/^_/)&&void 0!==b()[c]};k=function(a){var c=[],d=Array.prototype.slice.call(arguments,1);i(d,c);return b()[a].apply(b(),c)};a.fn.fineUploader=function(e){var f=this,g=arguments,h=[];this.each(function(i,n){c=a(n);if(b()&&j(e)){if(h.push(k.apply(f,g)),1===f.length)return!1}else"object"===typeof e||!e?d.apply(f,g):a.error("Method "+e+" does not exist on jQuery.fineUploader")});return 1===h.length?h[0]:1<h.length?h:this}})(jQuery);