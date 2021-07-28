
const Util = {
    inherits(childClass, parentClass) {
        childClass.prototype = Object.create(parentClass.prototype);
        childClass.prototype.constructor = childClass;
    },

    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },

    // Scale the length of a vector by the given amount.
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },

    randomPos(radius){
        return [Math.floor(Math.random()*(1000- radius)), Math.floor(Math.random()*(600 - radius))];
    },

    randRGB(){
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        console.log(r);
        return `rgb(${r}, ${g}, ${b})`;
    },

    wrap(posPt, max){
        if(posPt < 0){
            return max - (Math.floor(posPt) % max);
        }
        else if (posPt > max){
            return Math.floor(posPt) % max;
        }
        else{
            return posPt;
        }
    },
    distBetweenTwoPositions(pos1, pos2){
        return Math.sqrt((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2);
    },
    norm(velocity){ //magnitude or length (pixels per sec)
        return this.distBetweenTwoPositions([0,0], velocity);
    }
};

module.exports = Util;