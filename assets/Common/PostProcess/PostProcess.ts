import { _decorator, Camera, Component, director, instantiate, Material, MeshRenderer, Node, RenderPipeline, RenderTexture, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PostProcess')
export class PostProcess extends Component {
    @property(Camera)
    renderCamera: Camera = null;

    @property(Camera)
    postProcessCamera: Camera = null;

    @property(RenderTexture)
    renderTexture: RenderTexture = null;

    @property(Material)
    postProcessMaterial: Material = null;

    @property(MeshRenderer)
    postProcessRenderer: MeshRenderer = null;

    @property
    depthSamplerName: string = '';  //深度图采样器名字

    start() {
        this.renderCamera.targetTexture = this.renderTexture;
        this.postProcessRenderer.setMaterial(this.postProcessMaterial, 0);
        this.postProcessMaterial.setProperty('mainTexture', this.renderTexture);

        if(this.depthSamplerName) {
            this.postProcessMaterial.setProperty(this.depthSamplerName, this.renderTexture.window.framebuffer.depthStencilTexture);
            let pass0 = this.postProcessMaterial.passes[0];
            let bindingIndex = pass0.getBinding(this.depthSamplerName);
            pass0.bindSampler(bindingIndex, director.root.pipeline.globalDSManager.pointSampler);
        }
    }
}

