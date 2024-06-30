import { _decorator, Component, MeshRenderer, Node, tween, v3, v4, Vec4 } from 'cc';
const { ccclass, property, requireComponent, executeInEditMode } = _decorator;

@ccclass('VolumeRenderUniformSetterSDF')
@requireComponent(MeshRenderer)
@executeInEditMode
export class VolumeRenderUniformSetterSDF extends Component {
    @property(Vec4)
    public centre: Vec4 = v4(0, 0, 0, 0);

    @property(Vec4)
    public centreOffset: Vec4 = v4(0, 0, 0, 0);

    private _meshRenderer: MeshRenderer | null = null;
    private _center: {c: Vec4} = {c: v4(0, 0, 0, 0)};
    start() {
        this._meshRenderer = this.getComponent(MeshRenderer);

        let tw1 = tween(this._center)
                    .set({c: this.centre.clone()})
                    .to(2, {c: this.centre.clone().add(this.centreOffset)}, {onUpdate: (target: {c: Vec4})=>{
                        this.updateProperty(target.c);
                    }})
                    .to(2, {c: this.centre}, {onUpdate: (target: {c: Vec4})=>{
                        this.updateProperty(target.c);
                    }});
        tween(this._center)
            .repeatForever(tw1)
            .start();
    }

    updateProperty(centre: Vec4) {
        let material = this._meshRenderer?.getMaterialInstance(0);
        material.setProperty('centre1', centre);
    }
}

