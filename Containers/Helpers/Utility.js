module.exports = {
    //tính khoảng cách
    location2Distance(currLat, currLon, targetLat, targetLon) {
        var R = 6371;
        var dLat = this.deg2rad(targetLat - currLat);
        var dLon = this.deg2rad(targetLon - currLon);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(currLat)) * Math.cos(this.deg2rad(targetLat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        var sDistance = '';
        if (d > 1)
            sDistance = this.toFixed(d, 2) + ' km';
        else
            sDistance = this.toFixed(d * 1000, 0) + ' m';

        return sDistance
    },

    deg2rad(deg) {
        return deg * (Math.PI / 180)
    },

    toFixed(value, precision) {
        var power = Math.pow(10, precision || 0);
        return String(Math.round(value * power) / power);
    },

    //Bỏ dấu tiếng việt
    changeAlias(alias) {
        var str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ  |ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ  |ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|$|_/g, "");
        str = str.replace(/-+-/g, "-");
        str = str.replace(/^\-+|\-+$/g, "");
        return str;
    },

    //number format: 1234567 -> 1.234.567
    numberFormat(num, dot) {
        let _dot = dot ? dot : '.'
        var parts = num.toString().split(_dot);
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, _dot);
        return parts.join(_dot);
    },

    //replace all from 'text' to 'replace' by 'search' 
    replaceAll(text, search, replace) {
        //if replace is not sent, return original string otherwise it will
        if (replace === undefined) {
            return text.toString();
        }
        return text.replace(new RegExp('[' + search + ']', 'g'), replace);
    },

    //format mac address
    macFormat(mac) {
        var newMac = ''
        var arr = mac.split(':')
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                if (arr[0].length == 1)
                    newMac = '0' + arr[0]
                else
                    newMac = arr[0]
            }
            else {
                if (arr[i].length == 1)
                    newMac += ':0' + arr[i]
                else
                    newMac += ':' + arr[i]
            }
        }
        return newMac
    },
}