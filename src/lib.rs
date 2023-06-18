use std::io::Cursor;

use wasm_bindgen::prelude::wasm_bindgen;
use web_sys::console::log_1 as log;
use base64::engine::Engine as _;
use base64::engine::general_purpose::STANDARD as BASE64;
use image::load_from_memory;
use image::ImageOutputFormat::*;

#[wasm_bindgen]
pub fn grayscale(encoded_file: &str) -> String {
    log(&"Grayscale called".into());
    let base64_to_vec: Vec<u8> = match BASE64.decode(encoded_file) {
        Ok(decoded) => decoded,
        Err(_) => {
            log(&"Failed to decode image".into());
            return String::new(); // Return empty string if decoding fails
        }
    };
    log(&"Image decoded".into());

    let mut img: image::DynamicImage = match load_from_memory(&base64_to_vec) {
        Ok(image) => image,
        Err(_) => {
            log(&"Failed to load image".into());
            return String::new(); // Return empty string if loading fails
        }
    };
    log(&"Image loaded".into());

    img = img.grayscale();
    log(&"Grayscale effect applied".into());

    let mut buffer: Cursor<Vec<u8>> = Cursor::new(vec![]);
    if let Err(_) = img.write_to(&mut buffer, Png) {
        log(&"Failed to write image".into());
        return String::new(); // Return empty string if writing fails
    }
    log(&"New image ready".into());

    let encoded_img: String = BASE64.encode(&buffer.get_ref());
    let data_url: String = format!("data:image/png;base64,{}", encoded_img);

    data_url
}
