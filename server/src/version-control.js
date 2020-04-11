
class FirmareVersion {

    constructor(version) {
        const part = version.split("_");
        
        this.major = Number.parseInt(part[0]);
        this.minor = Number.parseInt(part[1]);
        this.build = Number.parseInt(part[2]);
        this.version = version;
    }

    get() {
        return {
            major: this.major,
            minor: this.minor,
            build: this.build
        }
    }

    gt(version) { //FIXME: 
        const current = version.major + version.build + version.minor;
        const file = this.major + this.build + this.minor;
        return current < file;
    }

    toString() {
        return `${this.major}_${this.minor}_${this.build}`;
    }

}

module.exports = FirmareVersion;