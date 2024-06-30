import { _decorator, Component, MeshRenderer, Node, v4 } from 'cc';
const { ccclass, property, requireComponent, executeInEditMode } = _decorator;

@ccclass('VolumeRenderUniformSetterRaycastHit')
@requireComponent(MeshRenderer)
@executeInEditMode
export class VolumeRenderUniformSetterRaycastHit extends Component {
    private _meshRenderer: MeshRenderer | null = null;
    start() {
        this._meshRenderer = this.getComponent(MeshRenderer);
    }

    update(deltaTime: number) {
        let material = this._meshRenderer?.getMaterialInstance(0);
        material.setProperty('centre', this.node.worldPosition);
    }
}

