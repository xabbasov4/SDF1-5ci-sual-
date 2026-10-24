# AI İstifadə Jurnalı

1. **Sorğu:** "PostgreSQL-də eyni istifadəçinin eyni tədbirə iki dəfə qeydiyyatdan keçməməsi üçün cədvəli necə qurmalıyam?"
   - **AI Təklifi:** `CONSTRAINT unique_user_event UNIQUE (user_id, event_id)` məhdudiyyətini əlavə etmək.
   - **Dəyişiklik:** Təklif eynilə `schema.sql` faylına tətbiq edildi.

2. **Sorğu:** "Express-də SQL injection-dan qorunmaq üçün sorğuları necə yazmaq lazımdır?"
   - **AI Təklifi:** Parameterized query-lərdən (`$1, $2`) istifadə.
   - **Öyrənilən anlayış:** Dinamik string birleşdirmələri əvəzinə parametrik sorğuların istifadəsi təhlükəsizliyi təmin edir.