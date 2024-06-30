import { Component, Material, MeshRenderer, RenderTexture, _decorator, director } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DepthMapSetter")
export default class DepthMapSetter extends Component {
    @property(RenderTexture)
    renderTexture: RenderTexture = null;

    @property
    samplerName: string = '';

    protected start(): void {
        let material = this.node.getComponent(MeshRenderer).sharedMaterial;
        material.setProperty(this.samplerName, this.renderTexture.window.framebuffer.depthStencilTexture);
        let pass0 = material.passes[0];
        let bindingIndex = pass0.getBinding(this.samplerName);
        pass0.bindSampler(bindingIndex, director.root.pipeline.globalDSManager.pointSampler);
    }
}