import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { arWebDesigner } from '@mescius/activereportsnet-designer';
import { JSViewer, createViewer } from '@mescius/activereportsnet-viewer';
import '@mescius/activereportsnet-designer/dist/web-designer.css';
import '@mescius/activereportsnet-viewer/dist/jsViewer.min.css';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  forecasts: any;
  private viewer: JSViewer | null = null;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    arWebDesigner.create('#ar-web-designer', {
      rpx: { enabled: true },
      appBar: { openButton: { visible: true } },
      data: {
        dataSets: { visible: true, canModify: true },
        dataSources: { canModify: true },
      },
      preview: {
        openViewer: (options: any) => {
          if (this.viewer) {
            this.viewer.openReport(options.documentInfo.id);
            return;
          }
          this.viewer = createViewer({
            element: '#' + options.element,
            reportService: {
              url: 'api/reporting',
            },
            reportID: options.documentInfo.id,
          });
        },
      },
    });
  }
  ngOnDestroy() {
    this.viewer?.destroy();
    arWebDesigner.destroy('#ar-web-designer');
  }
  title = 'webdesigner_angular.client';
}
