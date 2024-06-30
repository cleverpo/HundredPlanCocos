import { __private, _decorator, Component, gfx, Node, renderer, RenderFlow } from "cc";
import { PostProcessRenderStage } from "./PostProcessRenderStage";
const { ccclass, property } = _decorator;

@ccclass("PostProcessRenderFlow")
export class PostProcessRenderFlow extends RenderFlow {
    private _frameBuffer: gfx.Framebuffer;

    initialize(info: __private._cocos_rendering_render_flow__IRenderFlowInfo): boolean {
        super.initialize(info);

        return true;
    }
    public render(camera: renderer.scene.Camera){
        let stages = this._stages;
        for(let i = 0; i < stages.length; i++){
            let stage = stages[i] as PostProcessRenderStage;
            let framebuffer;
            if(i == stages.length){
                framebuffer = camera.window.framebuffer;
            }else{

            }

        }
    }
}
