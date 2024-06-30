import { _decorator, Component, Event, MeshRenderer, Node, Texture2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LutScene')
export class LutScene extends Component {
    @property([Texture2D])
    lutTextures: Texture2D[] = [];

    @property(MeshRenderer)
    meshRenderer: MeshRenderer = null;


    onBtnClick(event: Event, customEventData: string) {
        let node = event.target as Node;
        let index = parseInt(node.name);

        let material = this.meshRenderer.getSharedMaterial(0);
        material.setProperty('lutTexture', this.lutTextures[index]);
    }
}

