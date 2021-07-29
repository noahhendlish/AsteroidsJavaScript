
const Util = {
    //inheritance function
    inherits(childClass, parentClass) {
        childClass.prototype = Object.create(parentClass.prototype);
        childClass.prototype.constructor = childClass;
    },
    //random vector
    randomVec(length) {
        const deg = 2 * Math.PI * Math.random();
        return Util.scale([Math.sin(deg), Math.cos(deg)], length);
    },

    // Scale the length of a vector by the given amount.
    scale(vec, m) {
        return [vec[0] * m, vec[1] * m];
    },

    //random Position in canvas space
    randomPos(radius){
        return [Math.floor(Math.random()*(1000- radius)), Math.floor(Math.random()*(600 - radius))];
    },

    //random color
    randRGB(){
        let r = Math.floor(Math.random()*255);
        let g = Math.floor(Math.random()*255);
        let b = Math.floor(Math.random()*255);
        return `rgb(${r}, ${g}, ${b})`;
    },

    //wrap helper function
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
    //calculate distance between two points
    distBetweenTwoPositions(pos1, pos2){
        return Math.sqrt((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2);
    },
    //calculate norm (magnitude or length)
    norm(velocity){
        return this.distBetweenTwoPositions([0,0], velocity);
    },
    fiftyPercentChance(){
        return ((Math.random()*10) % 2) !== 0
    }
};
module.exports = Util;