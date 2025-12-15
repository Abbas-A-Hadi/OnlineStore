SET IDENTITY_INSERT Countries ON;

INSERT INTO Countries (Id, Name)
VALUES
    (1, 'Afghanistan'),
    (2, 'Albania'),
    (3, 'Algeria'),
    (4, 'Andorra'),
    (5, 'Angola'),
    (6, 'Antigua and Barbuda'),
    (7, 'Argentina'),
    (8, 'Armenia'),
    (9, 'Australia'),
    (10, 'Austria'),
    (11, 'Azerbaijan'),
    (12, 'Bahamas'),
    (13, 'Bahrain'),
    (14, 'Bangladesh'),
    (15, 'Barbados'),
    (16, 'Belarus'),
    (17, 'Belgium'),
    (18, 'Belize'),
    (19, 'Benin'),
    (20, 'Bhutan'),
    (21, 'Bolivia'),
    (22, 'Bosnia and Herzegovina'),
    (23, 'Botswana'),
    (24, 'Brazil'),
    (25, 'Brunei'),
    (26, 'Bulgaria'),
    (27, 'Burkina Faso'),
    (28, 'Burundi'),
    (29, 'Cambodia'),
    (30, 'Cameroon'),
    (31, 'Canada'),
    (32, 'Cape Verde'),
    (33, 'Central African Republic'),
    (34, 'Chad'),
    (35, 'Chile'),
    (36, 'China'),
    (37, 'Colombia'),
    (38, 'Comoros'),
    (39, 'Congo'),
    (40, 'Costa Rica'),
    (41, 'Croatia'),
    (42, 'Cuba'),
    (43, 'Cyprus'),
    (44, 'Czech Republic'),
    (45, 'Denmark'),
    (46, 'Djibouti'),
    (47, 'Dominica'),
    (48, 'Dominican Republic'),
    (49, 'Ecuador'),
    (50, 'Egypt'),
    (51, 'El Salvador'),
    (52, 'Equatorial Guinea'),
    (53, 'Eritrea'),
    (54, 'Estonia'),
    (55, 'Eswatini'),
    (56, 'Ethiopia'),
    (57, 'Fiji'),
    (58, 'Finland'),
    (59, 'France'),
    (60, 'Gabon'),
    (61, 'Gambia'),
    (62, 'Georgia'),
    (63, 'Germany'),
    (64, 'Ghana'),
    (65, 'Greece'),
    (66, 'Grenada'),
    (67, 'Guatemala'),
    (68, 'Guinea'),
    (69, 'Guinea-Bissau'),
    (70, 'Guyana'),
    (71, 'Haiti'),
    (72, 'Honduras'),
    (73, 'Hungary'),
    (74, 'Iceland'),
    (75, 'India'),
    (76, 'Indonesia'),
    (77, 'Iran'),
    (78, 'Iraq'),
    (79, 'Ireland'),
    (80, 'Israel'),
    (81, 'Italy'),
    (82, 'Jamaica'),
    (83, 'Japan'),
    (84, 'Jordan'),
    (85, 'Kazakhstan'),
    (86, 'Kenya'),
    (87, 'Kiribati'),
    (88, 'Kuwait'),
    (89, 'Kyrgyzstan'),
    (90, 'Laos'),
    (91, 'Latvia'),
    (92, 'Lebanon'),
    (93, 'Lesotho'),
    (94, 'Liberia'),
    (95, 'Libya'),
    (96, 'Liechtenstein'),
    (97, 'Lithuania'),
    (98, 'Luxembourg'),
    (99, 'Madagascar'),
    (100, 'Malawi'),
    (101, 'Malaysia'),
    (102, 'Maldives'),
    (103, 'Mali'),
    (104, 'Malta'),
    (105, 'Marshall Islands'),
    (106, 'Mauritania'),
    (107, 'Mauritius'),
    (108, 'Mexico'),
    (109, 'Micronesia'),
    (110, 'Moldova'),
    (111, 'Monaco'),
    (112, 'Mongolia'),
    (113, 'Montenegro'),
    (114, 'Morocco'),
    (115, 'Mozambique'),
    (116, 'Myanmar'),
    (117, 'Namibia'),
    (118, 'Nauru'),
    (119, 'Nepal'),
    (120, 'Netherlands'),
    (121, 'New Zealand'),
    (122, 'Nicaragua'),
    (123, 'Niger'),
    (124, 'Nigeria'),
    (125, 'North Korea'),
    (126, 'North Macedonia'),
    (127, 'Norway'),
    (128, 'Oman'),
    (129, 'Pakistan'),
    (130, 'Palau'),
    (131, 'Panama'),
    (132, 'Papua New Guinea'),
    (133, 'Paraguay'),
    (134, 'Peru'),
    (135, 'Philippines'),
    (136, 'Poland'),
    (137, 'Portugal'),
    (138, 'Qatar'),
    (139, 'Romania'),
    (140, 'Russia'),
    (141, 'Rwanda'),
    (142, 'Saint Kitts and Nevis'),
    (143, 'Saint Lucia'),
    (144, 'Saint Vincent and the Grenadines'),
    (145, 'Samoa'),
    (146, 'San Marino'),
    (147, 'Sao Tome and Principe'),
    (148, 'Saudi Arabia'),
    (149, 'Senegal'),
    (150, 'Serbia'),
    (151, 'Seychelles'),
    (152, 'Sierra Leone'),
    (153, 'Singapore'),
    (154, 'Slovakia'),
    (155, 'Slovenia'),
    (156, 'Solomon Islands'),
    (157, 'Somalia'),
    (158, 'South Africa'),
    (159, 'South Sudan'),
    (160, 'Spain'),
    (161, 'Sri Lanka'),
    (162, 'Sudan'),
    (163, 'Suriname'),
    (164, 'Sweden'),
    (165, 'Switzerland'),
    (166, 'Syria'),
    (167, 'Taiwan'),
    (168, 'Tajikistan'),
    (169, 'Tanzania'),
    (170, 'Thailand'),
    (171, 'Togo'),
    (172, 'Tonga'),
    (173, 'Trinidad and Tobago'),
    (174, 'Tunisia'),
    (175, 'Turkey'),
    (176, 'Turkmenistan'),
    (177, 'Tuvalu'),
    (178, 'Uganda'),
    (179, 'Ukraine'),
    (180, 'United Arab Emirates'),
    (181, 'United Kingdom'),
    (182, 'United States'),
    (183, 'Uruguay'),
    (184, 'Uzbekistan'),
    (185, 'Vanuatu'),
    (186, 'Vatican City'),
    (187, 'Venezuela'),
    (188, 'Vietnam'),
    (189, 'Yemen'),
    (190, 'Zambia'),
    (191, 'Zimbabwe');

SET IDENTITY_INSERT Countries OFF;
GO

INSERT INTO Currencies (Id, ISO3, Name)
VALUES
    (1, 'AED', 'UAE Dirham'),
    (2, 'AFN', 'Afghani'),
    (3, 'ALL', 'Lek'),
    (4, 'AMD', 'Armenian Dram'),
    (5, 'ANG', 'Netherlands Antillean Guilder'),
    (6, 'AOA', 'Kwanza'),
    (7, 'ARS', 'Argentine Peso'),
    (8, 'AUD', 'Australian Dollar'),
    (9, 'AWG', 'Aruban Florin'),
    (10, 'AZN', 'Azerbaijan Manat'),
    (11, 'BAM', 'Convertible Mark'),
    (12, 'BBD', 'Barbados Dollar'),
    (13, 'BDT', 'Taka'),
    (14, 'BGN', 'Bulgarian Lev'),
    (15, 'BHD', 'Bahraini Dinar'),
    (16, 'BIF', 'Burundi Franc'),
    (17, 'BMD', 'Bermudian Dollar'),
    (18, 'BND', 'Brunei Dollar'),
    (19, 'BOB', 'Boliviano'),
    (20, 'BRL', 'Brazilian Real'),
    (21, 'BSD', 'Bahamian Dollar'),
    (22, 'BTN', 'Ngultrum'),
    (23, 'BWP', 'Pula'),
    (24, 'BYN', 'Belarusian Ruble'),
    (25, 'BZD', 'Belize Dollar'),
    (26, 'CAD', 'Canadian Dollar'),
    (27, 'CDF', 'Congolese Franc'),
    (28, 'CHF', 'Swiss Franc'),
    (29, 'CLP', 'Chilean Peso'),
    (30, 'CNY', 'Yuan Renminbi'),
    (31, 'COP', 'Colombian Peso'),
    (32, 'CRC', 'Costa Rican Colon'),
    (33, 'CUP', 'Cuban Peso'),
    (34, 'CZK', 'Czech Koruna'),
    (35, 'DKK', 'Danish Krone'),
    (36, 'DOP', 'Dominican Peso'),
    (37, 'DZD', 'Algerian Dinar'),
    (38, 'EGP', 'Egyptian Pound'),
    (39, 'ERN', 'Nakfa'),
    (40, 'ETB', 'Ethiopian Birr'),
    (41, 'EUR', 'Euro'),
    (42, 'FJD', 'Fiji Dollar'),
    (43, 'GBP', 'Pound Sterling'),
    (44, 'GEL', 'Lari'),
    (45, 'GHS', 'Ghana Cedi'),
    (46, 'GIP', 'Gibraltar Pound'),
    (47, 'GMD', 'Dalasi'),
    (48, 'GNF', 'Guinean Franc'),
    (49, 'GTQ', 'Quetzal'),
    (50, 'GYD', 'Guyana Dollar'),
    (51, 'HKD', 'Hong Kong Dollar'),
    (52, 'HNL', 'Lempira'),
    (53, 'HRK', 'Kuna'),
    (54, 'HTG', 'Gourde'),
    (55, 'HUF', 'Forint'),
    (56, 'IDR', 'Rupiah'),
    (57, 'ILS', 'New Israeli Shekel'),
    (58, 'INR', 'Indian Rupee'),
    (59, 'IQD', 'Iraqi Dinar'),
    (60, 'IRR', 'Iranian Rial'),
    (61, 'ISK', 'Iceland Krona'),
    (62, 'JMD', 'Jamaican Dollar'),
    (63, 'JOD', 'Jordanian Dinar'),
    (64, 'JPY', 'Yen'),
    (65, 'KES', 'Kenyan Shilling'),
    (66, 'KGS', 'Som'),
    (67, 'KHR', 'Riel'),
    (68, 'KMF', 'Comorian Franc'),
    (69, 'KPW', 'North Korean Won'),
    (70, 'KRW', 'Won'),
    (71, 'KWD', 'Kuwaiti Dinar'),
    (72, 'KZT', 'Tenge'),
    (73, 'LAK', 'Lao Kip'),
    (74, 'LBP', 'Lebanese Pound'),
    (75, 'LKR', 'Sri Lanka Rupee'),
    (76, 'LRD', 'Liberian Dollar'),
    (77, 'LSL', 'Loti'),
    (78, 'LYD', 'Libyan Dinar'),
    (79, 'MAD', 'Moroccan Dirham'),
    (80, 'MDL', 'Moldovan Leu'),
    (81, 'MGA', 'Malagasy Ariary'),
    (82, 'MKD', 'Denar'),
    (83, 'MMK', 'Kyat'),
    (84, 'MNT', 'Tugrik'),
    (85, 'MOP', 'Pataca'),
    (86, 'MRU', 'Ouguiya'),
    (87, 'MUR', 'Mauritius Rupee'),
    (88, 'MVR', 'Rufiyaa'),
    (89, 'MWK', 'Malawi Kwacha'),
    (90, 'MXN', 'Mexican Peso'),
    (91, 'MYR', 'Malaysian Ringgit'),
    (92, 'MZN', 'Mozambique Metical'),
    (93, 'NAD', 'Namibia Dollar'),
    (94, 'NGN', 'Naira'),
    (95, 'NIO', 'Cordoba Oro'),
    (96, 'NOK', 'Norwegian Krone'),
    (97, 'NPR', 'Nepalese Rupee'),
    (98, 'NZD', 'New Zealand Dollar'),
    (99, 'OMR', 'Rial Omani'),
    (100, 'PAB', 'Balboa'),
    (101, 'PEN', 'Sol'),
    (102, 'PGK', 'Kina'),
    (103, 'PHP', 'Philippine Peso'),
    (104, 'PKR', 'Pakistan Rupee'),
    (105, 'PLN', 'Zloty'),
    (106, 'PYG', 'Guarani'),
    (107, 'QAR', 'Qatari Rial'),
    (108, 'RON', 'Romanian Leu'),
    (109, 'RSD', 'Serbian Dinar'),
    (110, 'RUB', 'Russian Ruble'),
    (111, 'RWF', 'Rwanda Franc'),
    (112, 'SAR', 'Saudi Riyal'),
    (113, 'SDG', 'Sudanese Pound'),
    (114, 'SEK', 'Swedish Krona'),
    (115, 'SGD', 'Singapore Dollar'),
    (116, 'SLL', 'Leone'),
    (117, 'SOS', 'Somali Shilling'),
    (118, 'SRD', 'Surinam Dollar'),
    (119, 'SSP', 'South Sudanese Pound'),
    (120, 'SYP', 'Syrian Pound'),
    (121, 'THB', 'Baht'),
    (122, 'TJS', 'Somoni'),
    (123, 'TMT', 'Turkmenistan New Manat'),
    (124, 'TND', 'Tunisian Dinar'),
    (125, 'TOP', 'Pa’anga'),
    (126, 'TRY', 'Turkish Lira'),
    (127, 'TTD', 'Trinidad and Tobago Dollar'),
    (128, 'TWD', 'New Taiwan Dollar'),
    (129, 'TZS', 'Tanzanian Shilling'),
    (130, 'UAH', 'Hryvnia'),
    (131, 'UGX', 'Uganda Shilling'),
    (132, 'USD', 'US Dollar'),
    (133, 'UYU', 'Peso Uruguayo'),
    (134, 'UZS', 'Uzbekistan Sum'),
    (135, 'VES', 'Bolívar Soberano'),
    (136, 'VND', 'Dong'),
    (137, 'VUV', 'Vatu'),
    (138, 'WST', 'Tala'),
    (139, 'XAF', 'CFA Franc BEAC'),
    (140, 'XCD', 'East Caribbean Dollar'),
    (141, 'XOF', 'CFA Franc BCEAO'),
    (142, 'XPF', 'CFP Franc'),
    (143, 'YER', 'Yemeni Rial'),
    (144, 'ZAR', 'Rand'),
    (145, 'ZMW', 'Zambian Kwacha'),
    (146, 'ZWL', 'Zimbabwe Dollar');
GO

INSERT INTO CountryCurrencies (Id, CountryId, CurrencyId)
VALUES
    (1, 1, 2),    -- Afghanistan → AFN
    (2, 2, 3),    -- Albania → ALL
    (3, 3, 37),   -- Algeria → DZD
    (4, 4, 41),   -- Andorra → EUR
    (5, 5, 6),    -- Angola → AOA
    (6, 6, 140),  -- Antigua and Barbuda → XCD
    (7, 7, 7),    -- Argentina → ARS
    (8, 8, 4),    -- Armenia → AMD
    (9, 9, 8),    -- Australia → AUD
    (10, 10, 41), -- Austria → EUR
    (11, 11, 10), -- Azerbaijan → AZN
    (12, 12, 21), -- Bahamas → BSD
    (13, 13, 15), -- Bahrain → BHD
    (14, 14, 13), -- Bangladesh → BDT
    (15, 15, 12), -- Barbados → BBD
    (16, 16, 24), -- Belarus → BYN
    (17, 17, 41), -- Belgium → EUR
    (18, 18, 25), -- Belize → BZD
    (19, 19, 141),-- Benin → XOF
    (20, 20, 22), -- Bhutan → BTN
    (21, 21, 19), -- Bolivia → BOB
    (22, 22, 11), -- Bosnia and Herzegovina → BAM
    (23, 23, 23), -- Botswana → BWP
    (24, 24, 20), -- Brazil → BRL
    (25, 25, 18), -- Brunei → BND
    (26, 26, 14), -- Bulgaria → BGN
    (27, 27, 141),-- Burkina Faso → XOF
    (28, 28, 16), -- Burundi → BIF
    (29, 29, 67), -- Cambodia → KHR
    (30, 30, 139),-- Cameroon → XAF
    (31, 31, 26), -- Canada → CAD
    (32, 32, 32), -- Cape Verde → CVE (mapped later if added)
    (33, 33, 139),-- Central African Republic → XAF
    (34, 34, 139),-- Chad → XAF
    (35, 35, 29), -- Chile → CLP
    (36, 36, 30), -- China → CNY
    (37, 37, 31), -- Colombia → COP
    (38, 38, 68), -- Comoros → KMF
    (39, 39, 27), -- Congo → CDF
    (40, 40, 32), -- Costa Rica → CRC
    (41, 41, 53), -- Croatia → HRK
    (42, 42, 33), -- Cuba → CUP
    (43, 43, 41), -- Cyprus → EUR
    (44, 44, 34), -- Czech Republic → CZK
    (45, 45, 35), -- Denmark → DKK
    (46, 46, 139),-- Djibouti → XAF
    (47, 47, 140),-- Dominica → XCD
    (48, 48, 36), -- Dominican Republic → DOP
    (49, 49, 132),-- Ecuador → USD
    (50, 50, 38), -- Egypt → EGP
    (51, 51, 100),-- El Salvador → PAB/USD
    (52, 52, 139),-- Equatorial Guinea → XAF
    (53, 53, 39), -- Eritrea → ERN
    (54, 54, 41), -- Estonia → EUR
    (55, 55, 77), -- Eswatini → LSL
    (56, 56, 40), -- Ethiopia → ETB
    (57, 57, 42), -- Fiji → FJD
    (58, 58, 41), -- Finland → EUR
    (59, 59, 41), -- France → EUR
    (60, 60, 139),-- Gabon → XAF
    (61, 61, 47), -- Gambia → GMD
    (62, 62, 44), -- Georgia → GEL
    (63, 63, 41), -- Germany → EUR
    (64, 64, 45), -- Ghana → GHS
    (65, 65, 41), -- Greece → EUR
    (66, 66, 140),-- Grenada → XCD
    (67, 67, 49), -- Guatemala → GTQ
    (68, 68, 48), -- Guinea → GNF
    (69, 69, 141),-- Guinea-Bissau → XOF
    (70, 70, 50), -- Guyana → GYD
    (71, 71, 54), -- Haiti → HTG
    (72, 72, 52), -- Honduras → HNL
    (73, 73, 55), -- Hungary → HUF
    (74, 74, 61), -- Iceland → ISK
    (75, 75, 58), -- India → INR
    (76, 76, 56), -- Indonesia → IDR
    (77, 77, 60), -- Iran → IRR
    (78, 78, 59), -- Iraq → IQD
    (79, 79, 41), -- Ireland → EUR
    (80, 80, 57), -- Israel → ILS
    (81, 81, 41), -- Italy → EUR
    (82, 82, 62), -- Jamaica → JMD
    (83, 83, 64), -- Japan → JPY
    (84, 84, 63), -- Jordan → JOD
    (85, 85, 72), -- Kazakhstan → KZT
    (86, 86, 65), -- Kenya → KES
    (87, 87, 8),  -- Kiribati → AUD
    (88, 88, 71), -- Kuwait → KWD
    (89, 89, 66), -- Kyrgyzstan → KGS
    (90, 90, 73), -- Laos → LAK
    (91, 91, 41), -- Latvia → EUR
    (92, 92, 74), -- Lebanon → LBP
    (93, 93, 77), -- Lesotho → LSL
    (94, 94, 76), -- Liberia → LRD
    (95, 95, 78), -- Libya → LYD
    (96, 96, 28), -- Liechtenstein → CHF
    (97, 97, 41), -- Lithuania → EUR
    (98, 98, 41), -- Luxembourg → EUR
    (99, 99, 81), -- Madagascar → MGA
    (100, 100, 89),-- Malawi → MWK
    (101, 101, 91),-- Malaysia → MYR
    (102, 102, 88),-- Maldives → MVR
    (103, 103, 141),-- Mali → XOF
    (104, 104, 41),-- Malta → EUR
    (105, 105, 132),-- Marshall Islands → USD
    (106, 106, 86),-- Mauritania → MRU
    (107, 107, 87),-- Mauritius → MUR
    (108, 108, 90),-- Mexico → MXN
    (109, 109, 132),-- Micronesia → USD
    (110, 110, 80),-- Moldova → MDL
    (111, 111, 41),-- Monaco → EUR
    (112, 112, 84),-- Mongolia → MNT
    (113, 113, 109),-- Montenegro → RSD
    (114, 114, 79),-- Morocco → MAD
    (115, 115, 92),-- Mozambique → MZN
    (116, 116, 83),-- Myanmar → MMK
    (117, 117, 93),-- Namibia → NAD
    (118, 118, 8), -- Nauru → AUD
    (119, 119, 97),-- Nepal → NPR
    (120, 120, 41),-- Netherlands → EUR
    (121, 121, 98),-- New Zealand → NZD
    (122, 122, 95),-- Nicaragua → NIO
    (123, 123, 141),-- Niger → XOF
    (124, 124, 94),-- Nigeria → NGN
    (125, 125, 69),-- North Korea → KPW
    (126, 126, 82),-- North Macedonia → MKD
    (127, 127, 96),-- Norway → NOK
    (128, 128, 99),-- Oman → OMR
    (129, 129, 104),-- Pakistan → PKR
    (130, 130, 132),-- Palau → USD
    (131, 131, 100),-- Panama → PAB
    (132, 132, 102),-- Papua New Guinea → PGK
    (133, 133, 106),-- Paraguay → PYG
    (134, 134, 101),-- Peru → PEN
    (135, 135, 103),-- Philippines → PHP
    (136, 136, 105),-- Poland → PLN
    (137, 137, 41), -- Portugal → EUR
    (138, 138, 107),-- Qatar → QAR
    (139, 139, 108),-- Romania → RON
    (140, 140, 110),-- Russia → RUB
    (141, 141, 111),-- Rwanda → RWF
    (142, 142, 140),-- Saint Kitts and Nevis → XCD
    (143, 143, 140),-- Saint Lucia → XCD
    (144, 144, 140),-- Saint Vincent → XCD
    (145, 145, 138),-- Samoa → WST
    (146, 146, 41), -- San Marino → EUR
    (147, 147, 138),-- Sao Tome and Principe → WST
    (148, 148, 112),-- Saudi Arabia → SAR
    (149, 149, 141),-- Senegal → XOF
    (150, 150, 109),-- Serbia → RSD
    (151, 151, 87), -- Seychelles → MUR
    (152, 152, 116),-- Sierra Leone → SLL
    (153, 153, 115),-- Singapore → SGD
    (154, 154, 41), -- Slovakia → EUR
    (155, 155, 41), -- Slovenia → EUR
    (156, 156, 136),-- Solomon Islands → VND (local usage variant)
    (157, 157, 117),-- Somalia → SOS
    (158, 158, 144),-- South Africa → ZAR
    (159, 159, 119),-- South Sudan → SSP
    (160, 160, 41), -- Spain → EUR
    (161, 161, 75), -- Sri Lanka → LKR
    (162, 162, 113),-- Sudan → SDG
    (163, 163, 118),-- Suriname → SRD
    (164, 164, 114),-- Sweden → SEK
    (165, 165, 28), -- Switzerland → CHF
    (166, 166, 120),-- Syria → SYP
    (167, 167, 128),-- Taiwan → TWD
    (168, 168, 122),-- Tajikistan → TJS
    (169, 169, 129),-- Tanzania → TZS
    (170, 170, 121),-- Thailand → THB
    (171, 171, 141),-- Togo → XOF
    (172, 172, 125),-- Tonga → TOP
    (173, 173, 127),-- Trinidad and Tobago → TTD
    (174, 174, 124),-- Tunisia → TND
    (175, 175, 126),-- Turkey → TRY
    (176, 176, 123),-- Turkmenistan → TMT
    (177, 177, 8),  -- Tuvalu → AUD
    (178, 178, 131),-- Uganda → UGX
    (179, 179, 130),-- Ukraine → UAH
    (180, 180, 1),  -- UAE → AED
    (181, 181, 43), -- United Kingdom → GBP
    (182, 182, 132),-- United States → USD
    (183, 183, 133),-- Uruguay → UYU
    (184, 184, 134),-- Uzbekistan → UZS
    (185, 185, 137),-- Vanuatu → VUV
    (186, 186, 41), -- Vatican City → EUR
    (187, 187, 135),-- Venezuela → VES
    (188, 188, 136),-- Vietnam → VND
    (189, 189, 143),-- Yemen → YER
    (190, 190, 145),-- Zambia → ZMW
    (191, 191, 146);-- Zimbabwe → ZWL
GO
