// var viewer; - Basic Viewer
var viewerApp;
var options = {
    env: 'AutodeskProduction',
    getAccessToken: function (onGetAccessToken) {
        var accessToken = "eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJjbGllbnRfaWQiOiJIZ0d3OXkzVUM5a1lxS2o1RW1CWXoxM0FzejJhcFlWSCIsImV4cCI6MTU2MjAwODM5NSwic2NvcGUiOlsiZGF0YTpyZWFkIiwiZGF0YTp3cml0ZSIsImRhdGE6Y3JlYXRlIiwiYnVja2V0OnJlYWQiLCJidWNrZXQ6Y3JlYXRlIl0sImF1ZCI6Imh0dHBzOi8vYXV0b2Rlc2suY29tL2F1ZC9qd3RleHA2MCIsImp0aSI6ImJmcDhNVUdUN2k2QzMwdExCVlBSVVFRVHRMb2hNMlJydWN6N2JCT0RlZkdha1N5eUJxYmVxQ3ZaTmlobFloSXYifQ.Q4mZH4UYJmpYkQLvbu-cB0-A4h7fiQgAPYEXm49nj3Y";
        var expireTimeSeconds = 3599;
        onGetAccessToken(accessToken, expireTimeSeconds);
    },
};
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6c2xldmluZV8wNzAxL1RFU1RFUi56aXA';
Autodesk.Viewing.Initializer(options, function onInitialized() {
    // Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure); -- Basic Viewer
    viewerApp = new Autodesk.Viewing.ViewingApplication('MyViewerDiv');
    viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Private.GuiViewer3D);
    viewerApp.loadDocument(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
});

/**
* Autodesk.Viewing.Document.load() success callback.
* Proceeds with model initialization.
*/
// var lmvDoc; -- basic viewer
var viewables;
var indexViewable = 0;
function onDocumentLoadSuccess(doc) {

    // A document contains references to 3D and 2D viewables.
    // viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), { 'type': 'geometry' }, true); --basic viewer
    viewables = viewerApp.bubble.search({ 'type': 'geometry' });
    console.log(viewables);
    if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }
    else if (viewables.length=== 1){
        console.error('Document contains 1 viewable.');
        return;
    }
    

    viewerApp.selectItem(viewables[0].data, onItemLoadSuccess, onItemLoadFail)
}
//     // Create Viewer instance and load model.
//     var viewerDiv = document.getElementById('MyViewerDiv');
//     viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
//     var errorCode = viewer.start();

//     // Check for initialization errors.
//     if (errorCode) {
//         console.error('viewer.start() error - errorCode:' + errorCode);
//         return;
//     }

//     // Choose any of the available viewables.
//     indexViewable = 0;
//     lmvDoc = doc;

//     // Everything is set up, load the model.
//     loadModel();
// } -- basic viewer
// function loadModel() {
//     var initialViewable = viewables[indexViewable];
//     var svfUrl = lmvDoc.getViewablePath(initialViewable);
//     var modelOptions = {
//         sharedPropertyDbPath: lmvDoc.getPropertyDbPath()
//     };
//     viewer.loadModel(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
// }
function loadPrevModel() {
    if (indexViewable === 0){
        indexViewable =  viewables.length;
    }
    else{
    indexViewable = (indexViewable - 1) % viewables.length;
    viewerApp.selectItem(viewables[indexViewable].data, onItemLoadSuccess, onItemLoadFail);
    }
    // viewer.tearDown();
    // viewer.setUp(viewer.config);

    // // Next viewable index. Loop back to 0 when overflown.
    // indexViewable = (indexViewable + 1) % viewables.length;
    // loadModel(); -- basic viewer
} 
function loadNextModel() {
    indexViewable = (indexViewable + 1) %viewables.length;
    viewerApp.selectItem(viewables[indexViewable].data, onItemLoadSuccess, onItemLoadFail);
    // viewer.tearDown();
    // viewer.setUp(viewer.config);

    // // Next viewable index. Loop back to 0 when overflown.
    // indexViewable = (indexViewable + 1) % viewables.length;
    // loadModel(); -- basic viewer
} 


/**
 * Autodesk.Viewing.Document.load() failuire callback.
 */
function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

/**
 * viewer.loadModel() success callback.
 * Invoked after the model's SVF has been initially loaded.
 * It may trigger before any geometry has been downloaded and displayed on-screen.
 */
function onItemLoadSuccess(viewer, item) {
    console.log('onitemLoadSuccess()!');
    // console.log('Validate model loaded: ' + (viewer.model === model)); -- basic viewer
    console.log(viewer);
    console.log(item);
    // console.log(model); -- basic viewer
}

/**
 * viewer.loadModel() failure callback.
 * Invoked when there's an error fetching the SVF file.
 */
function onItemLoadFail(errorCode) {
    console.error('onitemLoadFail() - errorCode:' + errorCode);
}
