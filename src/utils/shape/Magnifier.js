import { Ellipse } from 'leafer-ui';

class Magnifier extends Ellipse {
    get __tag() { return 'Magnifier' }
}
Magnifier.registerUI();
Magnifier.setEditConfig(function () {
    return {
        middlePoint: null,
        rotateable: false,
        lockRatio: true
    }
});

export default Magnifier;