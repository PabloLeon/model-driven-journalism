const allPredicors = {
  ods_code: {
    name: 'ODS Code',
    description: 'Organisational​ ​Data​ Service',
  },
  nhs_trust: {
    name: 'Trust name',
    description: '',
  },
  cancer_type: {
    name: 'Cancer type',
    description: 'The type of cancer',
  },
  care_path: {
    name: 'Care path',
    description:
      'Where the patients admitted to hospital for treatment, not admitted, or outpatients',
  },
  numtreat_total: {
    name: 'Total treated',
    description: 'Total​ ​number​ of​ ​people receiving​ first​ ​treatment​ ​for cancer',
  },
  numtreat_less62days: {
    name: 'First treatment in less then 62 days',
    description: 'Number​ of​ ​people​ receiving first​ treatment​ for​ cancer within​ 62​ ​days.',
  },
  numtreat_more62days: {
    name: 'First treatment after 62 days',
    description: 'Number​ of​ people​​ receiving first treatment​ ​for​ ​cancer​ ​after 62​ days.',
  },
  precenttreat_62days: {
    name: 'First treatment in less then 62 days, proportional',
    description:
      'Proportion​ ​of​ patients​ ​that received​ ​ first​ ​ treatment​ ​ before 62​ ​days.',
  },
  wait_within31: {
    name: 'First treatment within 31 days',
    description:
      'Number​ of​ ​people​ ​receiving first​ ​treatment​ ​for​ cancer within​ 31​ ​ days',
  },
  wait_32to38: {
    name: 'First treatment within 32 to 38 days',
    description:
      'Number​ ​ of​ ​ people​ ​ receivingfirst​ ​treatment​ ​for​ cancer within​ ​ 32​ ​ to​ ​ 38​ ​ days.',
  },
  wait_49to62: {
    name: 'First treatment within 49 to 62 days',
    description:
      'Number​ ​ of​ ​ people​ ​ receivingfirst​ ​treatment​ ​for​ cancer within​ ​ 49​ ​ to​ ​ 62​ ​ days.',
  },
  wait_63to76: {
    name: 'First treatment within 63 to 76 days',
    description:
      'Number​ ​ of​ ​ people​ ​ receivingfirst​ ​treatment​ ​for​ cancer within​ ​ 63 ​ to​ ​ 76 ​ days.',
  },
  wait_77to90: {
    name: 'First treatment within 77 to 90 days',
    description:
      'Number​ ​ of​ ​ people​ ​ receivingfirst​ ​treatment​ ​for​ cancer within​ ​ 77 ​ to​ ​ 90 ​ days.',
  },
  wait_91to104: {
    name: 'First treatment within 91 to 104 days',
    description:
      'Number​ ​ of​ ​ people​ ​ receivingfirst​ ​treatment​ ​for​ cancer within​ ​ 91 ​ to​ ​ 104 ​ days.',
  },
  wait_104plus: {
    name: 'First treatment after 104 days',
    description:
      'Number​ ​ of​ ​ people​ ​ receiving first​ ​ treatment​ ​ for​ ​ cancer​ ​ after 104​ ​ days.',
  },
  shmi_ind: {
    name: 'SHMI Index',
    description:
      "This​ ​ variable​ ​ is​ ​ calculated​ ​ from the​ ​ ratio​ ​ between​ ​ the​ ​ actual number​ ​ of​ ​ patients​ ​ who​ ​ die following​ ​ hospitalisation​ ​ at​ ​ the trust​ ​ ( ​ observed_deaths​ ) ​ ​ and the​ ​ number​ ​ that​ ​ would​ ​ be expected​ ​ to​ ​ die​ ​ on​ ​ the​ ​ basis​ ​ of average​ ​ England​ ​ figures (​ expected_deaths​ ),​ ​ given​ ​ the characteristics​ ​ of​ ​ the​ ​ patients treated​ ​ there.​ ​ ​ It​ ​ includes deaths​ ​ which​ ​ occur​ ​ in​ ​ hospital and​ ​ deaths​ ​ which​ ​ occur outside​ ​ of​ ​ hospital​ ​ within​ ​ 30 days​ ​ (inclusive)​ ​ of​ ​ discharge. The​ ​ SHMI​ ​ gives​ ​ an​ ​ indication for​ ​ each​ ​ non-specialist​ ​ acute NHS​ ​ trust​ ​ in​ ​ England​ ​ whether the​ ​ observed​ ​ number​ ​ of deaths​ ​ within​ ​ 30​ ​ days​ ​ of discharge​ ​ from​ ​ hospital​ ​ was 'above​ ​ expected'​ ​ (SHMI value>1)​ ​ or​ ​ 'lower​ ​ than expected'​ ​ (SHMI​ ​ value<1). Breast​ ​ cancer​ ​ = ​ ​ diagnosis category​ ​ group​ ​ 18 Colon​ ​ cancer​ ​ = ​ ​ diagnosis category​ ​ group 10 Lung​ ​ cancer​ ​ = ​ ​ diagnosis category​ ​ group​ ​ 15",
  },
  cat_beds_day: {
    name: 'Available daybeds',
    description:
      'The​ ​ total​ ​ number​ ​ of​ ​ available beds​ ​ (day​ ​ only)​ ​ for​ ​ general​ ​ and acute',
  },
  cat_beds_night: {
    name: 'Available nightbeds',
    description:
      'The​ ​ total​ ​ number​ ​ of​ ​ available beds​ ​ (night ​ only)​ ​ for​ ​ general​ ​ and acute',
  },
  cat_Anaesthetics: {
    name: 'Number of Anaesthetics (in FTE)',
    description: '',
  },
  cat_Clinical_oncology: {
    name: 'Number of clinical oncologists (in FTE)',
    description: '',
  },
  cat_Emergency_Medicine: {
    name: 'Number of emergency medicine staff (in FTE)',
    description: '',
  },
  cat_General_medicine_group: {
    name: 'Number of general medicine staff (in FTE)',
    description: '',
  },
  cat_Radiology_group: {
    name: 'Number of radiology staff (in FTE)',
    description: '',
  },
  cat_Surgical_group: {
    name: 'Number of surgical staff (in FTE)',
    description: '',
  },
  cat_clinstaff_grade1: {
    name: 'Number of grade 1 medical staff',
    description: 'Number of staff with rating 1 (lowest).',
  },
  cat_clinstaff_grade2: {
    name: 'Number of grade 2 medical staff',
    description: 'Number of staff with rating 2.',
  },
  cat_clinstaff_grade3: {
    name: 'Number of grade 3 medical staff',
    description: 'Number of staff with rating 3.',
  },
  cat_clinstaff_grade4: {
    name: 'Number of grade 4 medical staff',
    description: 'Number of staff with rating 4.',
  },
  cat_clinstaff_grade5: {
    name: 'Number of grade 5 medical staff',
    description: 'Number of staff with rating 5 (average) .',
  },
  cat_clinstaff_grade6: {
    name: 'Number of grade 6 medical staff',
    description: 'Number of staff with rating 6.',
  },
  cat_clinstaff_grade7: {
    name: 'Number of grade 7 medical staff',
    description: 'Number of staff with rating 7.',
  },
  cat_clinstaff_grade8: {
    name: 'Number of grade 8 medical staff',
    description: 'Number of staff with rating 8.',
  },
  cat_clinstaff_grade9: {
    name: 'Number of grade 9 medical staff',
    description: 'Number of staff with rating 9.',
  },
  cat_clinstaff_grade10: {
    name: 'Number of grade 10 medical staff',
    description: 'Number of staff with rating 10 (highest).',
  },
  cat_Nurse_HealthVisitors: {
    name: 'Nurses and Health visitors',
    description: 'Nurses​ ​ & ​ ​ health​ ​ visitors',
  },
  cat_STT: {
    name: 'Scientific, therapeutic and technical staff',
    description: 'Scientific,​ ​ therapeutic​ ​ & technical​ ​ (STT)​ ​ staff',
  },
  cat_Support_Clinical: {
    name: 'Support​ ​ to​ ​ doctors,​ ​ nurses​ ​& midwives',
    description: 'Support​ ​ to​ ​ doctors,​ ​ nurses​ ​ & midwives',
  },
  cat_Support_STT: {
    name: 'Support​ ​ to​ ​ ST&T​ ​ staff',
    description: 'Support​ ​ to​ ​ ST&T​ ​ staff',
  },
  hee_region_code: {
    name: 'Health​ ​ Education​ ​ England regions',
    description: 'Health​ ​ Education​ ​ England regions',
  },
  ytd_plan: {
    name: 'Year-to-date​ ​ (YTD)​ ​ planned financial​ ​ balance​',
    description: 'Year-to-date​ ​ (YTD)​ ​ planned financial​ ​balance​ ​ of​ ​ trust',
  },
  ytd_actual: {
    name: 'Year-to-date​ ​ (YTD)​ ​ actual financial​ ​ balance​',
    description: 'Year-to-date​ ​ (YTD)​ ​ actual financial​ ​ balance​ ​ of​ ​ trust',
  },
  planactual_diff: {
    name: 'Year-to-date difference planned-actual',
    description: 'ytd_plan​ ​ minus​ ​ ytd_actual',
  },
  ytd_plan_miss: {
    name: 'Financial performance',
    description:
      '1 = trust​ did​ not​​ reach​​ planned YTD​​ balance,​ 0​ = trust​​ reached or​ ​did​​ better​ than​​ forecasted',
  },
  deficit: {
    name: 'Financial deficit',
    description:
      '1 = trusts​ that​ are​​ in​​ deficit​ ​i.e with​ a​ negative​​ balance,​ 0​ = trusts​ ​ not​ ​ in​ ​ deficit',
  },
  hospitalN: {
    name: 'Number of hospitals',
    description: 'Number of hospitals in trust',
  },
  unadj_score_Q55: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q47: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q44: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q59: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q37: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q30: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q29: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q25: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q16: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q12: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q6: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q2: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
  unadj_score_Q1: {
    name: 'Survey Score',
    description:
      'Unadjusted​ scores​ by cancer and​​ trust​ for​​ questions​​ in​​ the National​​ Cancer​ Patient Experience​​ Survey.​',
  },
};

export default allPredicors;
