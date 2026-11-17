# Bộ dữ liệu thật cho Khám phá ngành và Khám phá trường

Hai file JSON trong thư mục này là mẫu để đội nội dung đi tổng hợp dữ liệu thật:

- `majors.template.json`: thông tin ngành và nội dung trang chi tiết ngành.
- `universities.template.json`: thông tin trường, cơ sở, chương trình đào tạo, tuyển sinh, điểm chuẩn, học phí và học bổng.

Các giá trị trong hai file chỉ là **dữ liệu minh họa cho cấu trúc**, không phải dữ liệu đã xác minh để đưa lên production.

## 1. Thứ tự nên thu thập

### P0 — đủ để mở trang danh sách và bộ lọc

Ngành:

- Mã ngành, tên ngành, tên tiếng Anh, nhóm ngành.
- Mô tả ngắn, ảnh đại diện.
- Sở thích liên quan, mã RIASEC, tổ hợp môn phổ biến.
- Kỹ năng và hướng nghề nghiệp chính.

Trường:

- Mã trường, tên đầy đủ, tên viết tắt, tên tiếng Anh.
- Loại hình, hệ thống trực thuộc, website chính thức.
- Tỉnh/thành, địa chỉ từng cơ sở, logo và ảnh bìa.
- Danh sách chương trình/ngành trường đang đào tạo.

### P1 — đủ cho trang chi tiết

Ngành:

- Tổng quan ngành, nội dung sẽ học, hoạt động thực tế.
- Dấu hiệu tự quan sát, bản đồ nghề nghiệp, thách thức thực tế.
- Ngành gần và điểm khác nhau.
- Nội dung Quick Self Check do đội chuyên môn biên soạn.

Trường:

- Tổng quan, điểm nổi bật, kiểm định, cơ sở vật chất.
- Phương thức tuyển sinh của từng năm.
- Điểm chuẩn theo từng chương trình, năm và phương thức.
- Học phí theo từng chương trình/năm học.
- Học bổng, ký túc xá, câu lạc bộ và đời sống sinh viên.

### P2 — dùng cho So sánh, Admission Checker và cá nhân hóa

- Chỉ tiêu theo chương trình và phương thức.
- Công thức tính điểm, thang điểm, điều kiện phụ, mức điểm tối thiểu.
- Mốc đăng ký, ngày thi, ngày công bố kết quả.
- Tổ hợp xét tuyển áp dụng cho từng chương trình.
- Lịch sử điểm chuẩn tối thiểu 3 năm nếu nguồn chính thức còn truy cập được.
- Học phí chi tiết và chính sách tăng học phí.
- Học bổng: điều kiện, giá trị, số lượng, thời hạn.
- Nguồn chính thức gắn với từng dữ kiện có tính thời gian.

## 2. Nguyên tắc nhập dữ liệu

1. Mỗi dữ kiện tuyển sinh phải có `academicYear` hoặc `admissionYear`.
2. Điểm chuẩn phải gắn với **trường + chương trình + năm + phương thức + thang điểm**. Không lưu một con số chung cho toàn trường.
3. Học phí phải gắn với **chương trình + năm học + đơn vị tính**. Không chỉ lưu chuỗi như `30–50 triệu`.
4. Một trường có thể có nhiều cơ sở; mỗi cơ sở dùng một `campusId` riêng.
5. Một ngành chuẩn của Bộ có thể được nhiều trường đào tạo dưới các chương trình khác nhau. Liên kết qua `majorId`, không sao chép tên ngành để làm khóa.
6. `sourceUrl` ưu tiên website trường, đề án tuyển sinh, thông báo điểm chuẩn hoặc văn bản chính thức. Bài báo chỉ dùng làm nguồn phụ.
7. Nếu chưa có dữ liệu, để `null` hoặc mảng rỗng. Không tự suy đoán và không lấy dữ liệu mock bù vào.
8. Ngày dùng định dạng ISO `YYYY-MM-DD`; tiền lưu bằng VND; điểm lưu dạng số.
9. Nội dung mô tả do UniView biên soạn cần ghi `sourceType: "EDITORIAL"`; số liệu từ trường ghi `sourceType: "OFFICIAL"`.
10. Chỉ hiển thị production khi `verification.status` là `VERIFIED` hoặc có quy trình duyệt tương đương.

## 3. Các giá trị chuẩn nên dùng thống nhất

- `ownership`: `PUBLIC`, `PRIVATE`, `INTERNATIONAL`, `OTHER`.
- `universityType`: `UNIVERSITY`, `ACADEMY`, `MEMBER_UNIVERSITY`, `COLLEGE`, `OTHER`.
- `admissionMethodCode`: `THPT`, `DGNL_HCM`, `DGNL_HN`, `TRANSCRIPT`, `DIRECT`, `INTERNATIONAL_CERTIFICATE`, `APTITUDE`, `OTHER`.
- `scoreStatus`: `OFFICIAL`, `REFERENCE`, `PENDING`.
- `verification.status`: `DRAFT`, `IN_REVIEW`, `VERIFIED`, `REJECTED`, `OUTDATED`.
- RIASEC: `R`, `I`, `A`, `S`, `E`, `C`.

Danh mục nhóm ngành, sở thích, tổ hợp môn, tỉnh/thành và phương thức tuyển sinh nên là bảng danh mục dùng chung. Không để mỗi người nhập một cách viết khác nhau.

## 4. Những trường không nên nhập tay

Các giá trị sau nên được database hoặc backend tính từ dữ liệu con:

- `universitiesCount` của ngành.
- `majorsCount` của trường.
- Số lượng trường theo vùng/loại hình.
- Khoảng học phí nhỏ nhất–lớn nhất của trường.
- Khoảng điểm chuẩn nhỏ nhất–lớn nhất của trường.
- Số phương thức tuyển sinh.

Nếu nhập tay các số đếm này, dữ liệu sẽ lệch ngay khi thêm hoặc xóa một chương trình.

## 5. Cấu trúc database nên tách

Database hiện tại mới có hai bảng `majors` và `universities`, chưa đủ lưu dữ liệu chi tiết. Khi triển khai, tối thiểu nên tách thành:

- `major_categories`, `majors`, `major_contents`, `major_relations`.
- `universities`, `university_campuses`, `university_contents`, `university_media`.
- `programs` để nối một trường với một ngành chuẩn.
- `admission_cycles`, `admission_methods`, `program_admission_methods`.
- `cutoff_scores`, `program_tuitions`, `scholarships`.
- `sources` và `data_verifications`.

Hai file JSON là định dạng thu thập/import; khi lưu PostgreSQL nên chuẩn hóa thành các bảng trên thay vì nhét toàn bộ vào một cột JSON duy nhất.

## 6. Kiểm tra trước khi import

- Không trùng `id`, `slug`, mã trường hoặc mã ngành.
- Mọi `categoryId`, `majorId`, `universityId`, `campusId` đều trỏ tới bản ghi tồn tại.
- URL mở được và là HTTPS nếu nguồn hỗ trợ.
- Năm của điểm chuẩn, học phí và đề án tuyển sinh khớp với nguồn.
- Điểm có đúng thang (`30`, `1200`, `150`, v.v.).
- Không ghi điểm sàn thành điểm chuẩn.
- Không ghi học phí một học kỳ thành học phí một năm.
- Tên chương trình chuẩn, chất lượng cao, tiên tiến hoặc liên kết quốc tế không bị gộp nhầm.
- Văn bản tiếng Việt lưu UTF-8, không bị lỗi dấu.
