use wasm_bindgen::{prelude::wasm_bindgen, UnwrapThrowExt};

#[wasm_bindgen]
pub struct IEEE754Bits {
    fixed_int: u64,
    fixed_frac: u64,
    sign: u8,
    exponent: u16,
    mantissa: u64,
}

#[wasm_bindgen]
impl IEEE754Bits {
    pub fn fixed_int(&self) -> u64 {
        self.fixed_int
    }

    pub fn fixed_frac(&self) -> u64 {
        self.fixed_frac
    }

    pub fn sign(&self) -> u8 {
        self.sign
    }

    pub fn exponent(&self) -> u16 {
        self.exponent
    }

    pub fn mantissa(&self) -> u64 {
        self.mantissa
    }
}

#[wasm_bindgen]
pub fn ieee754(sign: bool, integer: u64, fraction: &str, double: bool) -> IEEE754Bits {
    let exponent_bits = if double { 11 } else { 8 };
    let mantissa_bits = if double { 52 } else { 23 };

    let mut fraction = fraction
    if fraction == "" fraction = "0";

    let f_bits = if double {
        format!("{}.{}", integer, fraction)
            .parse::<f64>()
            .unwrap_throw()
            .to_bits()
    } else {
        format!("{}.{}", integer, fraction)
            .parse::<f32>()
            .unwrap_throw()
            .to_bits()
            .into()
    };

    let sign = if sign { 1 } else { 0 };
    let exponent = ((f_bits >> mantissa_bits) & ((1 << exponent_bits) - 1)) as u16;
    let mantissa = f_bits & ((1 << mantissa_bits) - 1);

    // calculate for fixed width notation from the mantissa
    let fixed_int = mantissa >> mantissa_bits;
    let fixed_frac = mantissa & ((1 << mantissa_bits) - 1);

    IEEE754Bits {
        fixed_int,
        fixed_frac,
        sign,
        exponent,
        mantissa,
    }
}
