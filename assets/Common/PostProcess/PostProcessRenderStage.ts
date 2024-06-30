import { _decorator, Component, Material, Node, Rect, renderer, RenderStage, __private, RenderFlow, RenderPipeline, rendering, gfx, Color } from "cc";
const { ccclass, property } = _decorator;

const colors: Color[] = [new Color(0, 0, 0, 1)]; 
@ccclass("PostProcessRenderStage")
export class PostProcessRenderStage extends RenderStage {
    private _renderArea = new Rect();
    private _stageDesc;
    private _localUBO;

    @property(Material)
    public postProcessMaterial: Material = null!;

    constructor(){
        super();
    }

    public initialize(info: __private._cocos_rendering_render_stage__IRenderStageInfo): boolean {
        super.initialize(info);
        return true;
    }
    
    public activate(pipeline: RenderPipeline, flow: RenderFlow): void {
        super.activate(pipeline, flow);
    }

    render(camera: renderer.scene.Camera) {
        const pipeline = this._pipeline;
        const device = pipeline.device;
        const sceneData = pipeline.pipelineSceneData;
        const cmdBuff = pipeline.commandBuffers[0];

        //更新CameraUBO
        pipeline.pipelineUBO.updateCameraUBO(camera);

        //根据视窗更新渲染区域
        const vp = camera.viewport;
        this._renderArea.x = vp.x * camera.width;
        this._renderArea.y = vp.y * camera.height;
        this._renderArea.width = vp.width * camera.width;
        this._renderArea.height = vp.height * camera.height;

        const renderData = pipeline.getPipelineRenderData();
        const framebuffer = camera.window.framebuffer;
        const renderPass = pipeline.getRenderPass(camera.clearFlag, framebuffer);

        if(camera.clearFlag & gfx.ClearFlagBit.COLOR){
            colors[0].x = camera.clearColor.x;
            colors[0].y = camera.clearColor.y;
            colors[0].z = camera.clearColor.z;
        }

        colors[0].w = camera.clearColor.w;

        
    }

    destroy() {
    }
}
