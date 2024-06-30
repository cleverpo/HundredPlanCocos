import { _decorator, CCBoolean, Component, math, Node, Tween, tween, v3, Vec3, Vec4 } from 'cc';
const { ccclass, property, executeInEditMode} = _decorator;

@ccclass('TweenComp')
@executeInEditMode
export class TweenComp extends Component {
    @property(CCBoolean)
    isRotate: Boolean = false;

    @property(CCBoolean)
    isTransition: Boolean = false;
    @property(Vec3)
    moveTo: Vec3 = new Vec3(0, 0, 0);

    start() {
        let tw: Tween<any>;
        if(this.isRotate){
            let tw1 = tween(this.node)
                        .set({eulerAngles: Vec3.ZERO});
            let tw2 = tween(this.node)
                        .to(5, {eulerAngles: v3(0, 360, 0)});


            tw = tween(this.node)
                    .sequence(tw1, tw2)
                    .repeatForever();
        }

        if(this.isTransition){
            let curPos = this.node.position.clone();
            let tw1 = tween(this.node)
                        .to(2, {position: this.moveTo});
            let tw2 = tween(this.node)
                        .to(2, {position: curPos});


            tw = tween(this.node)
                    .sequence(tw1, tw2)
                    .repeatForever();
        }

        tw?.start();
    }

    update(deltaTime: number) {
        
    }
}

