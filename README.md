# Login Authentication

🎁 Note with Passport:

* passport.initialize : middleware được gọi ở từng request, kiểm tra session lấy ra passport.user nếu chưa có thì tạo rỗng.
* passport.session: middleware sử dụng kịch bản Passport , sử dụng session lấy thông tin user rồi gắn vào req.user.
* passport.authenticate: middleware giúp ta gắn kịch bản local vào route.
* passport.serializeUser: hàm được gọi khi xác thực thành công để lưu thông tin user vào session
* passport.deserializeUser : hàm được gọi bởi passport.session .Giúp ta lấy dữ liệu user dựa vào thông tin lưu trên session và gắn vào req.user


✨Lưu ý : phải set callback google giống trong console developer google.  
🎏Flash message: Là nội dung và cũng điều kiện để hiển thị alerts lên. 