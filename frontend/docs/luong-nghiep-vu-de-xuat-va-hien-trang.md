# UniView — Mô tả website và luồng nghiệp vụ

Cập nhật theo xác nhận của chủ sản phẩm ngày 18/11/2026.

Bản này ghi lại cách website được tổ chức, luồng sử dụng và những phần sẽ phát triển tiếp. Đây là bản mô tả nghiệp vụ đã chốt để cả nhóm cùng theo dõi, không phải xác nhận mọi tính năng đã hoàn thiện trong code. Lần cập nhật này chỉ sửa tài liệu, không thay đổi code ứng dụng.

## Những điểm vừa chốt lại

- Giữ ba gói: **Gói Tháng, Gói Năm và Admission Pass**.
- **Gói Tháng không có Route Mapping, Scenario Planning và Decision Board.**
- Gói Năm và Admission Pass có quyền dùng các công cụ tuyển sinh trên trong phạm vi thời hạn/quyền lợi của gói.
- Report assessment có cấu trúc **3 nhóm ngành, mỗi nhóm 6 ngành**, tổng cộng **18 ngành**. Đây là cấu trúc report theo xác nhận mới nhất của chủ sản phẩm.
- So sánh trường và Admission Checker **cần tách đầy đủ trải nghiệm cơ bản và trải nghiệm cá nhân hóa theo từng gói**. Việc hoàn thiện phần này nằm trong kế hoạch phát triển tiếp.
- Những chức năng còn thiếu được ghi lại để phát triển sau; không thực hiện sửa code trong đợt này.

## 1. Khi người dùng vào website

Đầu tiên, guest sẽ vào landing page, hiện có thể xem như trang chủ của UniView. Tại đây người dùng được giới thiệu về website và có thể đi vào khám phá ngành, khám phá trường, dùng công cụ cơ bản hoặc bắt đầu làm khảo sát.

Không bắt buộc đăng nhập ngay để xem thông tin công khai. Khi muốn lưu trường, lưu tiến độ khảo sát hoặc sử dụng các tính năng gắn với tài khoản thì người dùng đăng nhập/đăng ký.

Sau khi đăng nhập, người dùng vẫn tiếp tục từ nơi đang xem, không phải làm lại từ đầu. Hồ sơ không cần nhập đầy đủ ngay lúc đăng ký; có thể bổ sung dần khi tự chỉnh hồ sơ hoặc khi làm assessment.

**Hướng phát triển sau:** trang chủ có thể bổ sung tin tức ngắn, thông báo và cập nhật tuyển sinh của các trường. Phần này chưa xem là tính năng đã hoàn thiện; sẽ cần nội dung có nguồn, ngày cập nhật và người phụ trách kiểm tra.

## 2. Các mục trên navbar

Navbar có Trang chủ, Khám phá ngành, Khám phá trường, nhóm Công cụ tuyển sinh và Làm khảo sát. Nhóm công cụ gồm So sánh trường, Admission Checker, Route Mapping và Scenario Planning.

Trong khu vực tài khoản có Hồ sơ, Shortlist, Roadmap và Decision Board theo quyền sử dụng. Quản lý gói nằm trong danh mục hồ sơ, cùng với thông tin cá nhân, hồ sơ học tập và sở thích/điều kiện.

## 3. Khám phá ngành

Trong tab này có danh sách các ngành, tìm kiếm và bộ lọc để người dùng thu hẹp những ngành muốn tìm hiểu.

Khi bấm xem chi tiết một ngành, người dùng xem các nội dung:

- Tổng quan.
- Bạn sẽ học gì.
- Hoạt động thực tế.
- Tự quan sát.
- Bản đồ nghề nghiệp.
- Thách thức thực tế.
- Quick Self Check.
- Ngành gần.
- Trường đào tạo.

Người dùng có thể tìm hiểu ngành trước khi làm khảo sát. Quick Self Check giúp tự quan sát ban đầu; kết quả này không thay thế assessment đầy đủ hoặc kết luận chắc chắn về việc hợp ngành.

Từ ngành đang xem, người dùng có thể tìm hiểu các trường đào tạo ngành đó hoặc tiếp tục sang assessment và roadmap để có thêm căn cứ.

## 4. Khám phá trường

Trong tab này có danh sách trường, tìm kiếm và bộ lọc. Khi bấm xem chi tiết trường sẽ có:

- Tổng quan.
- Ngành đào tạo; số lượng hiển thị theo dữ liệu của trường.
- Phương thức tuyển sinh.
- Điểm chuẩn các năm.
- Học phí và học bổng.
- Sinh viên và đời sống.

Từ đây người dùng có thể lưu trường, thêm trường vào so sánh hoặc dùng Admission Checker để đối chiếu điểm.

Thông tin cần phân biệt đúng cơ sở, ngành/chương trình và năm tuyển sinh. Dữ liệu chưa có thì ghi rõ chưa có, không lấy thông tin mẫu để trình bày như dữ liệu thật.

## 5. So sánh trường

Có hai mức trải nghiệm:

- **Tài khoản chưa mua gói:** so sánh tổng quan, dựa trên các thông tin công khai cơ bản của trường.
- **Tài khoản có Gói Tháng, Gói Năm hoặc Admission Pass:** so sánh cụ thể hơn theo quyền lợi từng gói, dựa trên dữ liệu cá nhân hóa người dùng đã cung cấp, kết quả assessment và bằng chứng roadmap nếu đã có.

Nếu người dùng chưa làm assessment hoặc roadmap thì vẫn dùng phần so sánh được mở cho mình; những dữ liệu nào chưa có cần được ghi rõ, không tự tạo kết quả cá nhân hóa.

Mục tiêu là giúp người dùng nhìn ra những điểm phù hợp, những điểm cần cân nhắc và các đánh đổi giữa các lựa chọn.

**Cần phát triển tiếp:** tách đầy đủ trải nghiệm cơ bản và cá nhân hóa theo từng gói. Có tài khoản trả phí không đồng nghĩa mọi gói đều có toàn bộ công cụ giống nhau; riêng Route Mapping, Scenario và Decision Board không thuộc Gói Tháng.

## 6. Admission Checker

Admission Checker là công cụ đối chiếu điểm dành cho học sinh. Các vai trò có thể sử dụng phần cơ bản; mức phân tích được mở thêm theo gói.

Luồng cơ bản: chọn trường và ngành/chương trình muốn kiểm tra → chọn phương thức/năm tham chiếu → nhập điểm → xem điểm chuẩn tham chiếu, chênh lệch và biểu đồ so sánh.

- **Tài khoản chưa mua gói:** kiểm tra điểm đơn giản và xem kết quả đối chiếu cơ bản.
- **Tài khoản trả phí:** có thêm phần diễn giải và gợi ý theo hồ sơ, mục tiêu và điều kiện người dùng, theo quyền lợi từng gói.

Giao diện cần dễ nhìn và dễ hiểu: điểm của bạn là bao nhiêu, mốc tham chiếu là bao nhiêu, chênh lệch bao nhiêu và nên tìm hiểu tiếp điều gì.

Giai đoạn này có thể tập trung vào đối chiếu với điểm chuẩn đã công bố của năm trước, chưa cần phát triển phần dự đoán điểm chuẩn năm hiện tại.

Kết quả nên ghi “cao hơn/thấp hơn/bằng mốc tham chiếu năm…” thay vì khẳng định chắc chắn đậu hoặc rớt. Nếu chưa có điểm chuẩn tương ứng thì vẫn giữ form và hiển thị “Hiện tại chưa có dữ liệu để đối chiếu”.

**Cần phát triển tiếp:** tách đầy đủ phần cơ bản và phần cá nhân hóa theo từng gói. Phân tích nâng cao của Checker không tự mở quyền Route Mapping, Scenario hay Decision Board cho Gói Tháng.

## 7. Route Mapping

**Dành cho Gói Năm và Admission Pass; Gói Tháng không có.**

Route Mapping giúp người dùng nhìn toàn bộ các con đường xét tuyển của ngành/trường đang quan tâm. Người dùng xem mình hiện có thể chuẩn bị những phương thức nào và còn thiếu điều kiện gì.

Ví dụ người dùng dự định xét THPT nhưng muốn chuẩn bị thêm ĐGNL hoặc một phương thức khác làm phương án dự phòng, nếu trường có áp dụng và còn kịp thời gian chuẩn bị.

Mỗi con đường cần thể hiện phương thức, điều kiện, hồ sơ/điểm/chứng chỉ cần có, thời hạn và những việc người dùng còn thiếu. Các phương thức cần gắn đúng ngành, chương trình, trường và mùa tuyển sinh.

**Đang phát triển tiếp:** hoàn thiện dữ liệu và cách đối chiếu điều kiện để người dùng phân biệt rõ đường chính, phương án dự phòng và phương thức không còn khả dụng.

## 8. Scenario Planning

**Dành cho Gói Năm và Admission Pass; Gói Tháng không có.**

Scenario Planning giúp người dùng xem những lựa chọn có thể thay đổi ra sao nếu các điều kiện đầu vào thay đổi.

Ví dụ: điểm tăng hoặc giảm, ngân sách cao hơn hoặc thấp hơn, mở rộng khu vực học, thay đổi ưu tiên về trường/ngành. Hệ thống đối chiếu để cho thấy những lựa chọn được mở rộng, bị thu hẹp hoặc vẫn cần cân nhắc.

Kịch bản giả định không tự ghi đè hồ sơ gốc hoặc điểm chính thức. Kết quả cần giải thích vì sao một lựa chọn thay đổi.

**Đang phát triển tiếp:** hoàn thiện việc tính toán, lưu kịch bản và giải thích tác động của từng điều kiện đầu vào.

## 9. Shortlist

Shortlist là nơi người dùng lưu lại các trường/ngành đã khám phá hoặc yêu thích để xem lại và cân nhắc. Việc lưu ở đây chưa có nghĩa người dùng đã quyết định theo đuổi hoặc bắt đầu một kế hoạch xét tuyển.

Khi đã đủ dữ liệu cá nhân hóa, các mục được đối chiếu và phân vào các nhóm:

- Tất cả.
- Đáp ứng nhiều tiêu chí.
- Đáng khám phá.
- Có trade-off.
- Ngoài điều kiện hiện tại.

Số lượng trong từng nhóm tính theo những mục thực sự đã lưu và dữ liệu hiện có, không phải những con số cố định.

Nếu người dùng mới tạo tài khoản và chưa nhập đủ thông tin thì vẫn lưu được. Lúc này chỉ lưu để xem lại, chưa tự đưa ra kết luận phù hợp hay ngoài điều kiện. Có thể bổ sung hồ sơ sau và phân loại lại khi đủ dữ liệu.

**Cần phát triển tiếp:** hoàn thiện luồng lưu và phân nhóm thống nhất; tránh dùng tiêu chí mặc định mẫu như thể người dùng đã cung cấp.

## 10. Decision Board

**Dành cho Gói Năm và Admission Pass; Gói Tháng không có.**

Decision Board là nơi lưu những mục tiêu người dùng đã quyết định theo dõi và chuẩn bị cho xét tuyển. Đây là kế hoạch theo đuổi lâu dài, khác với Shortlist chỉ lưu để cân nhắc.

Luồng: chọn một lựa chọn từ Shortlist hoặc lúc khám phá → chủ động thêm vào Decision Board → xác định mục tiêu ngành/trường/chương trình → chọn các phương thức muốn theo đuổi → theo dõi việc cần chuẩn bị, deadline và kết quả.

Một mục tiêu có thể có nhiều phương thức như tuyển thẳng, xét tuyển sớm, ĐGNL hoặc THPT nếu trường áp dụng. Các phương thức có điều kiện, hồ sơ và lịch riêng; không nên gộp tất cả thành một deadline chung của trường.

Cách tổ chức cần hướng đến: **mùa tuyển sinh → mục tiêu ngành/trường/chương trình → các phương thức/đợt xét tuyển → checklist và deadline**.

**Đang phát triển tiếp:** làm rõ cách tổ chức kế hoạch, cập nhật thông tin của trường và trạng thái theo dõi. Thông báo qua web và email khi có cập nhật liên quan cũng là phần cần phát triển, chưa ghi là đã hoạt động đầy đủ.

## 11. Luồng làm khảo sát — Assessment

Người dùng đăng nhập và bắt đầu assessment, gồm RIASEC Holland, phần tìm hiểu sở thích/trải nghiệm/bối cảnh và các dữ kiện cá nhân hóa.

Dữ kiện cá nhân có thể gồm điểm số, môn thế mạnh, khu vực muốn học, ngân sách, ưu tiên và trải nghiệm đã có. Các thông tin được bổ sung dần; không bắt nhập tất cả ngay khi tạo tài khoản.

Sau khi hoàn thành assessment, hệ thống tạo report cá nhân hóa để phân tích các tín hiệu và gợi ý những ngành nên tìm hiểu thêm.

## 12. Report sau assessment

**Cấu trúc đã chốt: 3 nhóm ngành, mỗi nhóm 6 ngành, tổng cộng 18 ngành.**

Report phân tích hồ sơ và gợi ý các ngành trong ba nhóm. Mỗi ngành có phần giải thích vì sao được gợi ý và những điều người dùng nên tìm hiểu hoặc kiểm chứng tiếp.

Theo luồng đã mô tả, mỗi ngành có thể gợi ý tối đa 3 trường/chương trình phù hợp từ dữ liệu hiện có. Nếu chưa đủ dữ liệu thì ghi rõ, không cố thêm lựa chọn chỉ để đủ số lượng.

Trường có thể xuất hiện ở nhiều ngành nếu có đào tạo những ngành đó. Vì vậy 18 ngành × tối đa 3 trường là các cặp ngành–trường/chương trình, không nhất thiết là 54 trường khác nhau.

Report ban đầu là cơ sở để tiếp tục khám phá, không phải kết luận cuối cùng rằng người dùng chắc chắn phù hợp với một ngành.

## 13. Roadmap kiểm chứng ngành

Sau report assessment, người dùng tiếp tục làm roadmap để kiểm chứng xem ngành mình đang quan tâm có thực sự phù hợp hay không.

Mỗi ngành tương ứng một roadmap. Với 18 ngành trong report, hệ thống cần chuẩn bị thư viện roadmap cho 18 ngành. Mỗi roadmap cần khoảng 3–5 task để lựa chọn và cá nhân hóa cho người dùng; task có thể tái sử dụng nếu bản chất các ngành và mục tiêu kiểm chứng tương đồng.

Luồng thực hiện: chọn ngành muốn kiểm chứng → chọn/nhận task phù hợp → thực hiện task → lưu hoặc nộp bằng chứng → phản tư về trải nghiệm → đánh giá kết quả → cập nhật report kiểm chứng ngành.

Khi có thêm bằng chứng, mức độ tin cậy của nhận định về ngành có cơ sở hơn. Kết quả có thể củng cố hướng đang chọn hoặc cho thấy cần cân nhắc ngành khác; không mặc định làm xong task là độ phù hợp luôn tăng.

Nếu người dùng thực hiện đủ các roadmap của report thì có cơ sở tổng hợp quá trình kiểm chứng trên toàn bộ 18 ngành. Phạm vi thực hiện, số task mở và phần được dùng theo từng gói vẫn theo quyền lợi gói; không tự bổ sung quyền mới trong tài liệu này.

**Cần phát triển tiếp:** hoàn thiện task, rubric, dữ liệu bằng chứng, mức cá nhân hóa và report sau roadmap; tránh bắt làm lại cùng một task khi bằng chứng có thể dùng chung.

## 14. Sau assessment và roadmap, người dùng đi đâu tiếp?

Kết quả assessment và roadmap giúp người dùng quay lại xem ngành/trường, so sánh và điều chỉnh những lựa chọn đã lưu trong Shortlist.

Khi đã chọn một mục tiêu muốn theo đuổi, người dùng có quyền phù hợp chủ động đưa mục tiêu đó sang Decision Board. Route Mapping hỗ trợ nhìn các đường xét tuyển; Scenario hỗ trợ thử thay đổi điều kiện; Decision Board theo dõi việc chuẩn bị thực tế.

Không bắt buộc mọi người phải đi cùng một thứ tự. Có người vào UniView chỉ để tìm trường hoặc check điểm; có người bắt đầu từ assessment rồi mới tìm ngành. Người dùng đến sát mùa tuyển sinh cần vào thẳng các công cụ liên quan được mở cho mình, không phải hoàn thành một hành trình khám phá dài trước.

## 15. Tóm tắt quyền và phần sẽ phát triển tiếp

| Nội dung | Chưa mua gói | Gói Tháng | Gói Năm | Admission Pass |
| --- | --- | --- | --- | --- |
| Khám phá ngành/trường | Thông tin công khai | Có | Có | Có |
| So sánh trường | Cơ bản | Cá nhân hóa theo gói | Cá nhân hóa theo gói | Cá nhân hóa theo gói |
| Admission Checker | Cơ bản | Phân tích theo gói | Phân tích theo gói | Phân tích theo gói |
| Route Mapping | Không có quyền đầy đủ | Không | Có | Có |
| Scenario Planning | Không có quyền đầy đủ | Không | Có | Có |
| Decision Board | Không có quyền đầy đủ | Không | Có | Có |
| Assessment / Report / Roadmap | Phạm vi miễn phí cần mô tả rõ thêm | Theo quyền lợi gói | Theo quyền lợi gói | Theo quyền lợi gói |

Ở đây “Free” là tài khoản chưa mua gói, không phải gói thương mại thứ tư. Gói Năm đã bao gồm Admission Pass trong phạm vi quyền lợi còn hiệu lực.

Những việc còn thiếu để phát triển tiếp:

- Tách trải nghiệm So sánh và Checker thành mức cơ bản/cá nhân hóa theo từng gói.
- Đồng bộ cấu trúc report 3 nhóm × 6 ngành giữa các phần liên quan.
- Hoàn thiện dữ liệu thật cho chi tiết ngành/trường và công cụ đối chiếu.
- Hoàn thiện Shortlist: lưu trước, đủ dữ liệu mới phân loại.
- Hoàn thiện Route Mapping, Scenario và Decision Board theo đúng mục đích riêng.
- Hoàn thiện roadmap, task, bằng chứng và report sau kiểm chứng.
- Phát triển quản trị cập nhật tuyển sinh và thông báo web/email.
- Phát triển tin tức ngắn trên trang chủ nếu triển khai hướng này.

Các phần trên được ghi nhận để làm tiếp sau. Không xem việc đã có giao diện hoặc dữ liệu demo là đã hoàn thiện toàn bộ nghiệp vụ bằng dữ liệu thật.
