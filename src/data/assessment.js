// assessment.js
// UniView mock assessment: 30 RIASEC + 64 MBTI-style questions.
// NOTE: Personality items are original mock questions, not official/licensed MBTI® Form M.

export const riasecAssessment = {
  id: "riasec-30-v1",
  title: "RIASEC Interest Profile",
  type: "RIASEC",
  responseScale: [
    { value: 1, label: "Rất không thích" },
    { value: 2, label: "Không thích" },
    { value: 3, label: "Phân vân / Không rõ" },
    { value: 4, label: "Thích" },
    { value: 5, label: "Rất thích" },
  ],
  questions: [
    { id: "R01", domain: "R", text: "Bạn có thích lắp ráp hoặc sửa một vật dụng bằng tay không?" },
    { id: "I01", domain: "I", text: "Bạn có thích tìm nguyên nhân của một vấn đề bằng cách thu thập và phân tích thông tin không?" },
    { id: "A01", domain: "A", text: "Bạn có thích thiết kế poster, hình ảnh hoặc sản phẩm có yếu tố sáng tạo không?" },
    { id: "S01", domain: "S", text: "Bạn có thích hướng dẫn một người khác hiểu cách làm một việc không?" },
    { id: "E01", domain: "E", text: "Bạn có thích thuyết phục người khác ủng hộ một ý tưởng của mình không?" },
    { id: "C01", domain: "C", text: "Bạn có thích sắp xếp dữ liệu hoặc tài liệu theo một hệ thống rõ ràng không?" },
    { id: "R02", domain: "R", text: "Bạn có thích sử dụng dụng cụ hoặc thiết bị để tạo ra một sản phẩm cụ thể không?" },
    { id: "I02", domain: "I", text: "Bạn có thích giải các câu hỏi logic hoặc bài toán cần suy luận nhiều bước không?" },
    { id: "A02", domain: "A", text: "Bạn có thích viết truyện, nội dung, kịch bản hoặc lời giới thiệu theo phong cách riêng không?" },
    { id: "S02", domain: "S", text: "Bạn có thích lắng nghe và hỗ trợ một người đang gặp khó khăn không?" },
    { id: "E02", domain: "E", text: "Bạn có thích trình bày ý tưởng trước một nhóm và kêu gọi mọi người tham gia không?" },
    { id: "C02", domain: "C", text: "Bạn có thích lập checklist và theo dõi từng bước để công việc không bị sót không?" },
    { id: "R03", domain: "R", text: "Bạn có thích làm việc với mô hình, máy móc, linh kiện hoặc vật liệu thực tế không?" },
    { id: "I03", domain: "I", text: "Bạn có thích thực hiện một thí nghiệm nhỏ để kiểm tra một giả thuyết không?" },
    { id: "A03", domain: "A", text: "Bạn có thích tạo video, hình minh họa, âm thanh hoặc một sản phẩm truyền thông mới không?" },
    { id: "S03", domain: "S", text: "Bạn có thích tổ chức hoạt động giúp một nhóm học hoặc làm việc hiệu quả hơn không?" },
    { id: "E03", domain: "E", text: "Bạn có thích đảm nhận vai trò dẫn dắt khi một nhóm cần đưa ra quyết định không?" },
    { id: "C03", domain: "C", text: "Bạn có thích kiểm tra lại số liệu, biểu mẫu hoặc thông tin để đảm bảo chính xác không?" },
    { id: "R04", domain: "R", text: "Bạn có thích thực hiện một công việc ngoài trời hoặc một hoạt động cần thao tác thực tế không?" },
    { id: "I04", domain: "I", text: "Bạn có thích đọc và tìm hiểu sâu về một chủ đề khoa học hoặc công nghệ mà mình tò mò không?" },
    { id: "A04", domain: "A", text: "Bạn có thích nghĩ ra nhiều cách khác nhau để thể hiện cùng một ý tưởng không?" },
    { id: "S04", domain: "S", text: "Bạn có thích giải thích kiến thức cho bạn bè khi họ chưa hiểu bài không?" },
    { id: "E04", domain: "E", text: "Bạn có thích thương lượng để hai bên đi đến một thỏa thuận cùng chấp nhận được không?" },
    { id: "C04", domain: "C", text: "Bạn có thích quản lý lịch, deadline hoặc hồ sơ để mọi thứ đúng thời hạn không?" },
    { id: "R05", domain: "R", text: "Bạn có thích tự tay dựng, lắp hoặc thử nghiệm một mô hình hoạt động được không?" },
    { id: "I05", domain: "I", text: "Bạn có thích nhìn vào một tập dữ liệu để tìm quy luật hoặc điểm bất thường không?" },
    { id: "A05", domain: "A", text: "Bạn có thích phối màu, bố cục hoặc phong cách để làm một sản phẩm trông khác biệt hơn không?" },
    { id: "S05", domain: "S", text: "Bạn có thích tham gia hoạt động tình nguyện, cố vấn hoặc hỗ trợ cộng đồng không?" },
    { id: "E05", domain: "E", text: "Bạn có thích giới thiệu một sản phẩm, dự án hoặc ý tưởng sao cho người nghe thấy thuyết phục không?" },
    { id: "C05", domain: "C", text: "Bạn có thích nhập, phân loại và duy trì thông tin theo quy tắc nhất quán không?" }
  ],
};

export const personalityTypeAssessment = {
  id: "personality-64-v1",
  title: "Personality Preferences",
  type: "MBTI_STYLE",
  disclaimer: "Bộ câu hỏi UniView tự xây dựng theo 4 cặp E/I, S/N, T/F, J/P; không phải MBTI® chính thức.",
  questions: [
    {"id": "EI01", "dimension": "EI", "prompt": "Khi vào một nhóm mới, bạn thường...", "options": [{"label": "Chủ động bắt chuyện với vài người trước", "value": "E"}, {"label": "Quan sát một lúc rồi mới bắt đầu trò chuyện", "value": "I"}]},
    {"id": "EI02", "dimension": "EI", "prompt": "Sau một tuần khá căng thẳng, bạn thường muốn...", "options": [{"label": "Gặp gỡ hoặc trò chuyện với người khác để lấy lại năng lượng", "value": "E"}, {"label": "Có khoảng thời gian riêng yên tĩnh để hồi phục", "value": "I"}]},
    {"id": "EI03", "dimension": "EI", "prompt": "Khi đang hình thành một ý tưởng, bạn thường...", "options": [{"label": "Nói ra để vừa trao đổi vừa làm rõ suy nghĩ", "value": "E"}, {"label": "Suy nghĩ tương đối rõ trong đầu rồi mới chia sẻ", "value": "I"}]},
    {"id": "EI04", "dimension": "EI", "prompt": "Sau một sự kiện đông người kéo dài, bạn thường cảm thấy...", "options": [{"label": "Vẫn khá hứng khởi vì có nhiều tương tác", "value": "E"}, {"label": "Cần thời gian yên tĩnh để nạp lại năng lượng", "value": "I"}]},
    {"id": "EI05", "dimension": "EI", "prompt": "Trong một môi trường hoàn toàn mới, bạn có xu hướng...", "options": [{"label": "Tìm người để hỏi và tương tác ngay", "value": "E"}, {"label": "Quan sát cách mọi thứ vận hành trước", "value": "I"}]},
    {"id": "EI06", "dimension": "EI", "prompt": "Khi có một ý tưởng chưa hoàn thiện, bạn thường...", "options": [{"label": "Chia sẻ sớm để nhận phản hồi", "value": "E"}, {"label": "Giữ lại, phát triển thêm rồi mới đưa ra", "value": "I"}]},
    {"id": "EI07", "dimension": "EI", "prompt": "Trong bài tập nhóm, bạn thích...", "options": [{"label": "Trao đổi thường xuyên trong suốt quá trình", "value": "E"}, {"label": "Có phần việc riêng để tập trung rồi mới ghép lại", "value": "I"}]},
    {"id": "EI08", "dimension": "EI", "prompt": "Trong giờ nghỉ, bạn thường muốn...", "options": [{"label": "Trò chuyện hoặc tương tác với người xung quanh", "value": "E"}, {"label": "Có một khoảng yên tĩnh cho riêng mình", "value": "I"}]},
    {"id": "EI09", "dimension": "EI", "prompt": "Ở một sự kiện kết nối, bạn thường thích...", "options": [{"label": "Nói chuyện ngắn với nhiều người khác nhau", "value": "E"}, {"label": "Nói chuyện lâu hơn với một vài người mình thấy hợp", "value": "I"}]},
    {"id": "EI10", "dimension": "EI", "prompt": "Khi gặp một vấn đề khó, cách tự nhiên hơn với bạn là...", "options": [{"label": "Trao đổi với ai đó để nghĩ thành lời", "value": "E"}, {"label": "Tự suy nghĩ trước rồi mới trao đổi", "value": "I"}]},
    {"id": "EI11", "dimension": "EI", "prompt": "Một cuối tuần lý tưởng với bạn thường thiên về...", "options": [{"label": "Có hoạt động cùng bạn bè hoặc nhiều tương tác", "value": "E"}, {"label": "Có thời gian riêng hoặc hoạt động với rất ít người", "value": "I"}]},
    {"id": "EI12", "dimension": "EI", "prompt": "Trong lớp hoặc cuộc họp, bạn thường...", "options": [{"label": "Dễ phát biểu ngay khi có ý nghĩ", "value": "E"}, {"label": "Thường cân nhắc kỹ rồi mới phát biểu", "value": "I"}]},
    {"id": "EI13", "dimension": "EI", "prompt": "Khi cần trao đổi một việc chưa rõ, bạn thường thích...", "options": [{"label": "Gọi hoặc nói trực tiếp để xử lý nhanh", "value": "E"}, {"label": "Nhắn hoặc viết trước để sắp xếp suy nghĩ", "value": "I"}]},
    {"id": "EI14", "dimension": "EI", "prompt": "Khi đến một nơi mới, bạn thường hiểu môi trường nhanh hơn bằng cách...", "options": [{"label": "Tương tác trực tiếp với nhiều người", "value": "E"}, {"label": "Quan sát và tự tìm hiểu trước", "value": "I"}]},
    {"id": "EI15", "dimension": "EI", "prompt": "Khi cần lấy lại năng lượng, bạn thường tìm đến...", "options": [{"label": "Hoạt động có người khác tham gia", "value": "E"}, {"label": "Không gian riêng và ít kích thích", "value": "I"}]},
    {"id": "EI16", "dimension": "EI", "prompt": "Trong một buổi brainstorm, bạn thường thích...", "options": [{"label": "Nói ý tưởng liên tục để cùng phát triển", "value": "E"}, {"label": "Viết hoặc suy nghĩ riêng một lúc rồi mới chia sẻ", "value": "I"}]},
    {"id": "SN01", "dimension": "SN", "prompt": "Khi học một kỹ năng mới, bạn thích bắt đầu từ...", "options": [{"label": "Hướng dẫn cụ thể và ví dụ rõ ràng", "value": "S"}, {"label": "Bức tranh tổng thể và nguyên lý phía sau", "value": "N"}]},
    {"id": "SN02", "dimension": "SN", "prompt": "Khi nghe giải thích về một chủ đề mới, bạn chú ý hơn đến...", "options": [{"label": "Thông tin cụ thể có thể quan sát hoặc kiểm chứng", "value": "S"}, {"label": "Ý nghĩa, mô hình và khả năng có thể suy ra", "value": "N"}]},
    {"id": "SN03", "dimension": "SN", "prompt": "Bạn thường nhớ tốt hơn...", "options": [{"label": "Chi tiết cụ thể của điều đã xảy ra", "value": "S"}, {"label": "Ấn tượng chung và ý nghĩa của sự việc", "value": "N"}]},
    {"id": "SN04", "dimension": "SN", "prompt": "Khi làm một dự án, bạn thường tin tưởng hơn vào...", "options": [{"label": "Cách làm đã được kiểm chứng", "value": "S"}, {"label": "Cách làm mới có tiềm năng tốt hơn", "value": "N"}]},
    {"id": "SN05", "dimension": "SN", "prompt": "Khi xem dữ liệu, bạn thường chú ý trước đến...", "options": [{"label": "Những con số và thông tin đang hiện hữu", "value": "S"}, {"label": "Mối liên hệ hoặc xu hướng ẩn phía sau", "value": "N"}]},
    {"id": "SN06", "dimension": "SN", "prompt": "Khi giải thích một ý tưởng, bạn thường dùng...", "options": [{"label": "Ví dụ thực tế và mô tả cụ thể", "value": "S"}, {"label": "Ẩn dụ, liên tưởng hoặc khái niệm rộng", "value": "N"}]},
    {"id": "SN07", "dimension": "SN", "prompt": "Khi nghĩ về tương lai, bạn thường tập trung hơn vào...", "options": [{"label": "Các bước thực tế có thể thực hiện", "value": "S"}, {"label": "Nhiều khả năng và hướng đi khác nhau", "value": "N"}]},
    {"id": "SN08", "dimension": "SN", "prompt": "Khi đọc một tài liệu, bạn thường quan tâm hơn đến...", "options": [{"label": "Các dữ kiện và chi tiết quan trọng", "value": "S"}, {"label": "Thông điệp và ý tưởng lớn", "value": "N"}]},
    {"id": "SN09", "dimension": "SN", "prompt": "Khi xử lý vấn đề quen thuộc, bạn thường...", "options": [{"label": "Áp dụng phương pháp đã từng hiệu quả", "value": "S"}, {"label": "Thử một cách tiếp cận mới dù chưa chắc chắn", "value": "N"}]},
    {"id": "SN10", "dimension": "SN", "prompt": "Khi lập kế hoạch, bạn thường thích...", "options": [{"label": "Mốc thời gian và đầu việc cụ thể", "value": "S"}, {"label": "Một định hướng chung để còn linh hoạt phát triển", "value": "N"}]},
    {"id": "SN11", "dimension": "SN", "prompt": "Bạn học nhanh hơn khi...", "options": [{"label": "Được xem ví dụ hoặc thực hành trực tiếp", "value": "S"}, {"label": "Hiểu lý thuyết và mối liên hệ giữa các ý tưởng", "value": "N"}]},
    {"id": "SN12", "dimension": "SN", "prompt": "Bạn thường dễ nhận ra...", "options": [{"label": "Điều đang thật sự xảy ra ở hiện tại", "value": "S"}, {"label": "Điều có thể xảy ra nếu xu hướng tiếp tục", "value": "N"}]},
    {"id": "SN13", "dimension": "SN", "prompt": "Khi viết báo cáo, bạn thường ưu tiên...", "options": [{"label": "Sự rõ ràng, chính xác và đủ chi tiết", "value": "S"}, {"label": "Góc nhìn mới và các kết luận có tính khái quát", "value": "N"}]},
    {"id": "SN14", "dimension": "SN", "prompt": "Khi chọn giải pháp, bạn thường nghiêng về...", "options": [{"label": "Giải pháp thực tế, dễ triển khai", "value": "S"}, {"label": "Giải pháp mới lạ, mở ra khả năng khác", "value": "N"}]},
    {"id": "SN15", "dimension": "SN", "prompt": "Trong một cuộc trò chuyện, bạn dễ hứng thú hơn với...", "options": [{"label": "Những chuyện và trải nghiệm thực tế", "value": "S"}, {"label": "Ý tưởng, giả thuyết và điều có thể xảy ra", "value": "N"}]},
    {"id": "SN16", "dimension": "SN", "prompt": "Bạn thường thoải mái hơn với nhiệm vụ...", "options": [{"label": "Có yêu cầu và tiêu chuẩn tương đối rõ", "value": "S"}, {"label": "Mở, cho phép tự định nghĩa cách tiếp cận", "value": "N"}]},
    {"id": "TF01", "dimension": "TF", "prompt": "Khi phải đưa ra quyết định khó, bạn thường ưu tiên...", "options": [{"label": "Tiêu chí logic và tính nhất quán", "value": "T"}, {"label": "Ảnh hưởng của quyết định tới những người liên quan", "value": "F"}]},
    {"id": "TF02", "dimension": "TF", "prompt": "Khi hai người tranh luận, bạn thường chú ý trước đến...", "options": [{"label": "Lập luận nào hợp lý và có bằng chứng hơn", "value": "T"}, {"label": "Cách để hai bên cảm thấy được lắng nghe", "value": "F"}]},
    {"id": "TF03", "dimension": "TF", "prompt": "Khi góp ý cho một người, bạn thường thiên về...", "options": [{"label": "Nói thẳng điểm cần cải thiện", "value": "T"}, {"label": "Chọn cách diễn đạt để người đó dễ tiếp nhận", "value": "F"}]},
    {"id": "TF04", "dimension": "TF", "prompt": "Với bạn, một quyết định công bằng thường là...", "options": [{"label": "Áp dụng tiêu chí giống nhau cho các trường hợp tương tự", "value": "T"}, {"label": "Cân nhắc hoàn cảnh riêng của từng người", "value": "F"}]},
    {"id": "TF05", "dimension": "TF", "prompt": "Khi thuyết phục người khác, bạn thường dựa nhiều hơn vào...", "options": [{"label": "Dữ liệu, nguyên nhân và hệ quả", "value": "T"}, {"label": "Giá trị, nhu cầu và điều người nghe quan tâm", "value": "F"}]},
    {"id": "TF06", "dimension": "TF", "prompt": "Khi chọn người cho một nhiệm vụ, bạn thường ưu tiên...", "options": [{"label": "Năng lực phù hợp nhất với yêu cầu", "value": "T"}, {"label": "Sự hòa hợp và động lực của cả nhóm", "value": "F"}]},
    {"id": "TF07", "dimension": "TF", "prompt": "Khi có một trade-off khó, bạn thường muốn...", "options": [{"label": "Xác định tiêu chí rồi so sánh khách quan", "value": "T"}, {"label": "Xem ai sẽ bị ảnh hưởng và ảnh hưởng ra sao", "value": "F"}]},
    {"id": "TF08", "dimension": "TF", "prompt": "Khi ai đó kể một vấn đề cá nhân, phản ứng đầu tiên của bạn thường là...", "options": [{"label": "Tìm cách phân tích vấn đề và đề xuất giải pháp", "value": "T"}, {"label": "Thể hiện sự thấu hiểu trước khi bàn tới giải pháp", "value": "F"}]},
    {"id": "TF09", "dimension": "TF", "prompt": "Trong tranh luận, bạn thường coi trọng hơn...", "options": [{"label": "Tính chính xác của lập luận", "value": "T"}, {"label": "Việc giữ cuộc trao đổi tôn trọng và xây dựng", "value": "F"}]},
    {"id": "TF10", "dimension": "TF", "prompt": "Khi một quy tắc gây bất tiện cho một người, bạn thường nghiêng về...", "options": [{"label": "Giữ quy tắc nếu nó hợp lý và áp dụng nhất quán", "value": "T"}, {"label": "Điều chỉnh nếu hoàn cảnh cụ thể thực sự khác biệt", "value": "F"}]},
    {"id": "TF11", "dimension": "TF", "prompt": "Khi đánh giá một ý tưởng, bạn thường hỏi trước...", "options": [{"label": "Nó có hợp lý và hoạt động được không?", "value": "T"}, {"label": "Nó có phù hợp với con người và giá trị liên quan không?", "value": "F"}]},
    {"id": "TF12", "dimension": "TF", "prompt": "Khi xảy ra xung đột trong nhóm, bạn thường...", "options": [{"label": "Tập trung vào vấn đề và tiêu chí để giải quyết", "value": "T"}, {"label": "Tập trung vào nhu cầu của từng người để giảm căng thẳng", "value": "F"}]},
    {"id": "TF13", "dimension": "TF", "prompt": "Bạn thường thấy một lời góp ý hữu ích khi nó...", "options": [{"label": "Cụ thể, chính xác và đi thẳng vào vấn đề", "value": "T"}, {"label": "Vừa rõ ràng vừa quan tâm đến cảm xúc người nhận", "value": "F"}]},
    {"id": "TF14", "dimension": "TF", "prompt": "Khi chọn giữa hai phương án tương đương, bạn thường cân nhắc thêm...", "options": [{"label": "Hiệu quả và tính hợp lý dài hạn", "value": "T"}, {"label": "Mức độ phù hợp với con người và giá trị cá nhân", "value": "F"}]},
    {"id": "TF15", "dimension": "TF", "prompt": "Khi bạn bè nhờ lời khuyên, bạn thường bắt đầu bằng...", "options": [{"label": "Phân tích nguyên nhân và các lựa chọn", "value": "T"}, {"label": "Hiểu họ đang cảm thấy và mong muốn điều gì", "value": "F"}]},
    {"id": "TF16", "dimension": "TF", "prompt": "Trong một nhóm, bạn thường dễ nhận ra hơn...", "options": [{"label": "Điểm chưa hợp lý trong kế hoạch", "value": "T"}, {"label": "Điểm có thể khiến thành viên không thoải mái hoặc mất động lực", "value": "F"}]},
    {"id": "JP01", "dimension": "JP", "prompt": "Khi có một deadline quan trọng, bạn thường thích...", "options": [{"label": "Lập kế hoạch sớm và hoàn thành theo từng mốc", "value": "J"}, {"label": "Giữ lịch linh hoạt và tăng tốc khi gần deadline", "value": "P"}]},
    {"id": "JP02", "dimension": "JP", "prompt": "Khi đi du lịch, bạn thường thích...", "options": [{"label": "Có lịch trình và các điểm chính được chuẩn bị trước", "value": "J"}, {"label": "Chỉ có khung cơ bản rồi quyết định tùy tình hình", "value": "P"}]},
    {"id": "JP03", "dimension": "JP", "prompt": "Khi có nhiều việc, bạn thường thấy dễ chịu hơn khi...", "options": [{"label": "Chốt thứ tự ưu tiên và xử lý lần lượt", "value": "J"}, {"label": "Giữ nhiều lựa chọn mở để đổi theo tình hình", "value": "P"}]},
    {"id": "JP04", "dimension": "JP", "prompt": "Với một quyết định không quá quan trọng, bạn thường...", "options": [{"label": "Muốn chốt sớm để chuyển sang việc khác", "value": "J"}, {"label": "Muốn để mở thêm một thời gian phòng khi có lựa chọn mới", "value": "P"}]},
    {"id": "JP05", "dimension": "JP", "prompt": "Bạn thường quản lý công việc bằng...", "options": [{"label": "Lịch, checklist hoặc kế hoạch khá rõ", "value": "J"}, {"label": "Ghi nhớ và điều chỉnh linh hoạt khi cần", "value": "P"}]},
    {"id": "JP06", "dimension": "JP", "prompt": "Khi kế hoạch thay đổi đột ngột, bạn thường...", "options": [{"label": "Hơi khó chịu vì nhịp đã bị phá vỡ", "value": "J"}, {"label": "Dễ thích nghi và xem đó là một lựa chọn mới", "value": "P"}]},
    {"id": "JP07", "dimension": "JP", "prompt": "Bạn thích bắt đầu một dự án khi...", "options": [{"label": "Mục tiêu và phạm vi đã tương đối rõ", "value": "J"}, {"label": "Có thể bắt đầu rồi điều chỉnh mục tiêu dần", "value": "P"}]},
    {"id": "JP08", "dimension": "JP", "prompt": "Khi làm bài dài ngày, bạn thường...", "options": [{"label": "Chia đều công việc qua nhiều ngày", "value": "J"}, {"label": "Làm theo cảm hứng hoặc mức độ cấp bách từng lúc", "value": "P"}]},
    {"id": "JP09", "dimension": "JP", "prompt": "Một không gian làm việc khiến bạn dễ tập trung hơn khi...", "options": [{"label": "Mọi thứ tương đối có vị trí và trật tự", "value": "J"}, {"label": "Bạn có thể để đồ theo cách tiện cho thời điểm hiện tại", "value": "P"}]},
    {"id": "JP10", "dimension": "JP", "prompt": "Khi có nhiều phương án tốt, bạn thường...", "options": [{"label": "Muốn chọn một phương án để tiến hành", "value": "J"}, {"label": "Muốn giữ thêm phương án mở càng lâu càng tốt", "value": "P"}]},
    {"id": "JP11", "dimension": "JP", "prompt": "Đối với lịch học cá nhân, bạn thường thích...", "options": [{"label": "Có giờ học khá ổn định", "value": "J"}, {"label": "Chọn thời điểm học theo năng lượng và tình hình hôm đó", "value": "P"}]},
    {"id": "JP12", "dimension": "JP", "prompt": "Khi nhóm làm dự án, bạn thường muốn...", "options": [{"label": "Phân vai và deadline rõ từ đầu", "value": "J"}, {"label": "Để nhóm tự điều chỉnh vai trò theo quá trình", "value": "P"}]},
    {"id": "JP13", "dimension": "JP", "prompt": "Nếu có một ngày rảnh, bạn thường thích...", "options": [{"label": "Biết trước mình sẽ làm những gì chính", "value": "J"}, {"label": "Để ngày đó mở và quyết định sau", "value": "P"}]},
    {"id": "JP14", "dimension": "JP", "prompt": "Khi xử lý việc vặt, bạn thường...", "options": [{"label": "Muốn hoàn thành cho xong trước khi nghỉ", "value": "J"}, {"label": "Có thể để lại và quay lại khi thuận tiện", "value": "P"}]},
    {"id": "JP15", "dimension": "JP", "prompt": "Khi gần hoàn thành một việc, bạn thường...", "options": [{"label": "Muốn đóng lại thật rõ rồi mới chuyển việc khác", "value": "J"}, {"label": "Sẵn sàng chuyển sang việc mới dù vẫn còn vài chi tiết mở", "value": "P"}]},
    {"id": "JP16", "dimension": "JP", "prompt": "Khi có quy trình sẵn, bạn thường...", "options": [{"label": "Thích biết các bước và tuân theo một cấu trúc ổn định", "value": "J"}, {"label": "Thích tùy chỉnh quy trình theo tình hình thực tế", "value": "P"}]}
  ],
};

export function scoreRiasec(answers = {}) {
  const scores = { R:0, I:0, A:0, S:0, E:0, C:0 };
  for (const q of riasecAssessment.questions) {
    const v = Number(answers[q.id]);
    if (v >= 1 && v <= 5) scores[q.domain] += v;
  }
  const ranking = Object.entries(scores).map(([code,score]) => ({code,score})).sort((a,b) => b.score-a.score);
  return { scores, ranking, top3: ranking.slice(0,3).map(x=>x.code).join("-") };
}

export function scorePersonalityType(answers = {}) {
  const scores = { E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0 };
  for (const q of personalityTypeAssessment.questions) {
    const v = answers[q.id];
    if (v && Object.prototype.hasOwnProperty.call(scores, v)) scores[v] += 1;
  }
  const type = (scores.E >= scores.I ? "E":"I") + (scores.S >= scores.N ? "S":"N") + (scores.T >= scores.F ? "T":"F") + (scores.J >= scores.P ? "J":"P");
  return { scores, type };
}

export default { riasecAssessment, personalityTypeAssessment };
