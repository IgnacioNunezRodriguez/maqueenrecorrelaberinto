function haChocado () {
    return pins.digitalReadPin(DigitalPin.P2) == 1
}
function girarDerecha () {
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(1000)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, v2)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, v2)
    basic.pause(500)
    maqueen.motorStop(maqueen.Motors.All)
}
function HayObstaculo () {
    return maqueen.Ultrasonic(PingUnit.Centimeters) <= 5 || haChocado()
}
function girarIzquierda () {
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(1000)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, v2)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, v2)
    basic.pause(500)
    maqueen.motorStop(maqueen.Motors.All)
}
function girar180 () {
    maqueen.motorStop(maqueen.Motors.All)
    basic.pause(1000)
    maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, v2)
    maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, v2)
    basic.pause(1000)
    maqueen.motorStop(maqueen.Motors.All)
}
function MejorGiro () {
    led.plotBarGraph(
    maqueen.Ultrasonic(PingUnit.Centimeters),
    500
    )
    LuzFrontal = maqueen.Ultrasonic(PingUnit.Centimeters)
    girarDerecha()
    led.plotBarGraph(
    maqueen.Ultrasonic(PingUnit.Centimeters),
    500
    )
    LuzDerecha = maqueen.Ultrasonic(PingUnit.Centimeters)
    girarDerecha()
    led.plotBarGraph(
    maqueen.Ultrasonic(PingUnit.Centimeters),
    500
    )
    LuzTrasera = maqueen.Ultrasonic(PingUnit.Centimeters)
    girarDerecha()
    led.plotBarGraph(
    maqueen.Ultrasonic(PingUnit.Centimeters),
    500
    )
    LuzIzquierda = maqueen.Ultrasonic(PingUnit.Centimeters)
    girarDerecha()
    if (haChocado()) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, v2)
    } else if (LuzDerecha < LuzIzquierda) {
        girarDerecha()
    } else if (LuzIzquierda > LuzDerecha) {
        girarIzquierda()
    } else {
        girar180()
    }
}
function NivelMinimo (NivelInicial: number) {
    return 25 * (NivelInicial / 100)
}
let LuzIzquierda = 0
let LuzTrasera = 0
let LuzDerecha = 0
let LuzFrontal = 0
let v2 = 0
let V1 = 150
v2 = 60
let LuzInicial = input.lightLevel()
pins.digitalWritePin(DigitalPin.P2, 0)
maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, V1)
basic.forever(function () {
    if (HayObstaculo()) {
        MejorGiro()
    }
    LuzInicial = input.lightLevel()
    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, V1)
})
