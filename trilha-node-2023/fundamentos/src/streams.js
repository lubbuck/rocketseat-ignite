import { Readable, Writable, Transform } from "node:stream"

class makeStream extends Readable {

  index = 0
  _read() {
    const i = this.index++

    setTimeout(() => {
      if (i > 5) {
        this.push(null)
      } else {
        const buf = Buffer.from(String(i))
        this.push(buf)
      }
    }, 1000);
  }

}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Buffer.from(String(Number(chunk.toString()) * -1));
    callback(null, transformed)
  }
}

class multipleByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

new makeStream()
  .pipe(new InverseNumberStream())
  .pipe(new multipleByTenStream())