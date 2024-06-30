import { Camera, Component, Material, MeshRenderer, RenderTexture, Vec3, _decorator, director, v4 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("UniformSetter")
export default class UniformSetter extends Component {
    @property(Camera)
    camera: Camera = null;
    
    protected start(): void {
        this.camera.camera.update();

        let material = this.node.getComponent(MeshRenderer).sharedMaterial;

        let cameraWorldPos = this.camera.camera.position;
        material.setProperty("cameraWorldPos", v4(cameraWorldPos.x, cameraWorldPos.y, cameraWorldPos.z, 1));
        material.setProperty("matViewProjInv", this.camera.camera.matViewProjInv);

        // console.log(this.camera.camera.position);
        console.log(this.camera.camera.matViewProjInv);
    }
}