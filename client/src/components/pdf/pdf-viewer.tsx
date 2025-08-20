import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Eye, 
  FileText,
  Printer,
  Maximize2,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PDFViewerProps {
  title: string;
  fileName: string;
  filePath: string;
  fileSize?: string;
  description?: string;
  type?: string;
  downloads?: number;
  className?: string;
  showPreview?: boolean;
}

export default function PDFViewer({
  title,
  fileName,
  filePath,
  fileSize,
  description,
  type,
  downloads = 0,
  className,
  showPreview = true
}: PDFViewerProps) {
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const zoomLevels = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.click();
  };

  const handlePrint = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.print();
    }
  };

  const getTypeColor = (docType: string) => {
    const colors = {
      'ANNUAL_REPORT': 'bg-blue-100 text-blue-800 border-blue-200',
      'QUARTERLY_RESULT': 'bg-green-100 text-green-800 border-green-200',
      'ANNOUNCEMENT': 'bg-purple-100 text-purple-800 border-purple-200',
      'GOVERNANCE': 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[docType as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const PDFContent = () => (
    <div className="space-y-4">
      {/* PDF Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
            disabled={zoom <= 0.5}
            data-testid="zoom-out-btn"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <Select value={zoom.toString()} onValueChange={(value) => setZoom(parseFloat(value))}>
            <SelectTrigger className="w-20" data-testid="zoom-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {zoomLevels.map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  {Math.round(level * 100)}%
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(2.0, zoom + 0.25))}
            disabled={zoom >= 2.0}
            data-testid="zoom-in-btn"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRotation((rotation + 90) % 360)}
            data-testid="rotate-btn"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            data-testid="print-btn"
          >
            <Printer className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            data-testid="download-btn"
          >
            <Download className="h-4 w-4" />
          </Button>
          
          {isFullscreen && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(false)}
              data-testid="exit-fullscreen-btn"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="relative">
        <iframe
          ref={iframeRef}
          src={`${filePath}#zoom=${Math.round(zoom * 100)}&rotation=${rotation}`}
          className={cn(
            "w-full border rounded-lg",
            isFullscreen ? "h-screen" : "h-96"
          )}
          title={`PDF Viewer - ${title}`}
          data-testid="pdf-iframe"
        />
      </div>
    </div>
  );

  return (
    <Card className={cn("group hover:shadow-lg transition-all duration-300", className)} data-testid="pdf-viewer-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors" data-testid="pdf-title">
              {title}
            </CardTitle>
            {description && (
              <p className="text-sm text-gray-600 mt-1" data-testid="pdf-description">
                {description}
              </p>
            )}
          </div>
          {type && (
            <span 
              className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                getTypeColor(type)
              )}
              data-testid="pdf-type-badge"
            >
              {type.replace('_', ' ')}
            </span>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1" data-testid="pdf-filename">
              <FileText className="h-4 w-4" />
              {fileName}
            </span>
            {fileSize && (
              <span data-testid="pdf-filesize">
                {fileSize}
              </span>
            )}
            <span data-testid="pdf-downloads">
              {downloads} downloads
            </span>
          </div>
        </div>

        {showPreview && (
          <div className="mb-4">
            <div className="border rounded-lg overflow-hidden">
              <iframe
                src={`${filePath}#toolbar=0&navpanes=0&scrollbar=0&page=1&zoom=75`}
                className="w-full h-48"
                title={`Preview - ${title}`}
                data-testid="pdf-preview"
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="flex-1" data-testid="view-pdf-btn">
                <Eye className="h-4 w-4 mr-1" />
                View PDF
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {title}
                </DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-hidden">
                <PDFContent />
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            data-testid="download-direct-btn"
          >
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(true)}
            data-testid="fullscreen-btn"
          >
            <Maximize2 className="h-4 w-4 mr-1" />
            Fullscreen
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}