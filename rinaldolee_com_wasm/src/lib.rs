use wasm_bindgen::prelude::*;

mod calculators;

pub use calculators::ieee754::IEEE754Bits;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_str(s: &str);
}
