document.addEventListener('pagerendered', function (ev) {
    var pageNumber = ev.detail.pageNumber;
    if (pageNumber === 1) {
        var page = PDFViewerApplication.pdfViewer._pages[pageNumber - 1];
        var pageContainer = page.div;

        // Setup canvas annotation layer
        var canvas = document.createElement('canvas');
        var pageCanvas = document.getElementById('page' + pageNumber);

        var customAnnotationsDiv = document.createElement('div');
        customAnnotationsDiv.style.width = pageContainer.style.width;
        customAnnotationsDiv.style.height = pageContainer.style.height;
        customAnnotationsDiv.style.pointerEvents = 'none';
        customAnnotationsDiv.classList.add('customAnnotationsLayer');
        pageContainer.appendChild(customAnnotationsDiv);
        
        customAnnotationsDiv.appendChild(canvas);
        canvas.style.width = pageCanvas.style.width;
        canvas.style.height = pageCanvas.style.height;
        canvas.width = pageCanvas.width;
        canvas.height = pageCanvas.height;

        var ctx = canvas.getContext("2d");

        // Add highlight
        var x = 100 * page.scale,
            y = 100 * page.scale,
            width = 75 * page.scale,
            height = 30 * page.scale,
            x2 = x + width,
            y2 = y + height;
        
        var pagePoint = page.viewport.convertToPdfPoint(x, y)
                .concat(page.viewport.convertToPdfPoint(x2, y2));

        var rect = page.viewport.convertToViewportRectangle(pagePoint);

        ctx.strokeRect(rect[0], rect[1], rect[2] - rect[0], rect[3] - rect[1]);
    }
});
