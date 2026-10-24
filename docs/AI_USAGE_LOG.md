# AI İstifadə Jurnalı (AI Usage Log)

### Sorğu 1: Verilənlər Bazası Quruluşu
- **Prompt:** "Universitet tədbir sistemi üçün PostgreSQL cədvəllərini necə qurum?"
- **AI Təklifi:** `events`, `users`, `registrations` cədvəllərini yaratmaq.
- **Etdiyim Dəyişiklik:** Təkrar qeydiyyatın qarşısını almaq üçün `registrations` cədvəlinə `UNIQUE(event_id, user_id)` constraint əlavə etdim.
- **Öyrəndiyim Anlayış:** Relational DB-də Unique constraints vasitəsilə data duplicate-in qarşısını almaq.

### Sorğu 2: Limit və Keçmiş Tarix Yoxlaması
- **Prompt:** "Express.js-də tədbir limitinin aşıldığını necə yoxlaya bilərəm?"
- **AI Təklifi:** `COUNT(*)` sorğusu ilə limit yoxlaması aparan kod təqdim etdi.
- **Etdiyim Dəyişiklik:** Kodda xətaların mərkəzləşdirilmiş `errorHandler` middleware-ə ötürülməsini təmin etdim.