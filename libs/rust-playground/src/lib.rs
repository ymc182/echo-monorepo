pub fn rust_playground() -> String {
    "rust_playground".into()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        assert_eq!(rust_playground(), "rust_playground".to_string());
    }
}
