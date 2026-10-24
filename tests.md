# Test Ssenariləri (Beş əsas ssenari)

1. **Ssenari 1: Uğurlu Tədbir Yaradılması (Normal hal)**
   - **Daxil edilən:** Bütün məcburi sahələr (gələcək tarix ilə).
   - **Gözlənilən nəticə:** HTTP 201 Created və bazada yeni sətir.

2. **Ssenari 2: Keçmiş Tarixlə Tədbir Yaradılması (Xəta halı)**
   - **Daxil edilən:** Keçmiş tarix daxil edilir.
   - **Gözlənilən nəticə:** HTTP 400 Bad Request, "Tədbir tarihi keçmiş ola bilməz" mesajı.

3. **Ssenari 3: Təkrar Qeydiyyatın Qarşısının Alınması (Xəta halı)**
   - **Daxil edilən:** Eyni e-poçt ilə eyni tədbirə ikinci dəfə müraciət.
   - **Gözlənilən nəticə:** HTTP 400 Bad Request, "Siz artıq bu tədbirə qeydiyyatdan keçmisiniz" mesajı.

4. **Ssenari 4: İştirakçı Limitinin Aşılması (Xəta halı)**
   - **Daxil edilən:** Limit 5 olan tədbirə 6-cı qeydiyyat cəhdi.
   - **Gözlənilən nəticə:** HTTP 400 Bad Request, "Tədbir üçün iştirakçı limiti dolmuşdur" mesajı.

5. **Ssenari 5: Kateqoriyaya görə Filtrasiya (Normal hal)**
   - **Daxil edilən:** `category=Konfrans` sorğusu göndərmək.
   - **Gözlənilən nəticə:** Yalnız "Konfrans" kateqoriyasına aid olan tədbirlərin siyahılanması.