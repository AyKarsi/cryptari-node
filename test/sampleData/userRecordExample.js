module.exports = {
	'_id': '5672c54648ec119d075ef3f2',
	'recordEntry': {
		'_id': '58a40c66ca16361b7cac2091',
		'name': 'dogofoodinc',
		'company': '567263551c96a0d10b98ef26',
		'__v': 0,
		'properties': [{
				'key': 'employee.info',
				'type': 'section',
				'i18n': {
					'de': 'Persönliche Informationen',
					'en': 'Personal Informationen'
				},
				'opts': {
					'readOnly': false
				},
				'properties': [{
						'key': 'employee.info.personalName',
						'type': 'group',
						'i18n': {
							'de': 'Name',
							'en': 'Name'
						},
						'properties': [{
								'key': 'employee.info.salutation',
								'type': 'text',
								'validations': {
									'presence': true
								},
								'i18n': {
									'de': 'Anrede',
									'en': 'Salutation'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.title',
								'type': 'text',
								'i18n': {
									'de': 'Titel',
									'en': 'Title'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.firstName',
								'type': 'text',
								'mappedTo': 'firstName',
								'validations': {
									'presence': true
								},
								'i18n': {
									'de': 'Vorname',
									'en': 'Firstname'
								},
								'opts': {
									'readOnly': false
								},
								'value': 'Alex'
							},
							{
								'key': 'employee.info.lastName',
								'type': 'text',
								'mappedTo': 'lastName',
								'validations': {
									'presence': true
								},
								'i18n': {
									'de': 'Nachname',
									'en': 'Lastname'
								},
								'opts': {
									'readOnly': false
								},
								'value': 'Trampisch'
							}
						],
						'opts': {
							'readOnly': false
						}
					},
					{
						'key': 'employee.info.personalAdress',
						'type': 'group',
						'i18n': {
							'de': 'Adresse',
							'en': 'Address',
							'info_de': 'Lorem Ipsum Adresse dolores',
							'info_en': 'Lorem Ipsum Address dolores in English'
						},
						'properties': [{
								'key': 'employee.info.street',
								'type': 'text',
								'i18n': {
									'de': 'Strasse',
									'en': 'Street'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.street2',
								'type': 'text',
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.city',
								'type': 'text',
								'i18n': {
									'de': 'Stadt',
									'en': 'City'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.postalCode',
								'type': 'text',
								'i18n': {
									'de': 'Postleitzahl',
									'en': 'Zip Code'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.country',
								'type': 'select',
								'service': 'countries',
								'i18n': {
									'de': 'Land',
									'en': 'Country'
								},
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						}
					},
					{
						'key': 'employee.info.personalContact',
						'type': 'group',
						'i18n': {
							'de': 'Kontakt',
							'en': 'Contact'
						},
						'properties': [{
								'key': 'employee.info.workEmail',
								'type': 'email',
								'validations': {
									'format': {}
								},
								'i18n': {
									'de': 'Email Arbeit',
									'en': 'Email Work'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.privateEmail',
								'type': 'email',
								'validations': {
									'format': {}
								},
								'i18n': {
									'de': 'Email Privat',
									'en': 'Email Private'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.workPhone',
								'type': 'phone',
								'i18n': {
									'de': 'Telefon Arbeit',
									'en': 'Phone Work'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.workMobile',
								'type': 'phone',
								'i18n': {
									'de': 'Mobil Arbeit',
									'en': 'Mobile Work'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.emergencyContacts',
								'type': 'comment',
								'i18n': {
									'de': 'Notfallnummern',
									'en': 'Emergency Contacts',
									'info_de': 'Name der Notfallnummer und Bezug (Bsp. Ehepartner)',
									'info_en': 'Name der Notfallnummer und Bezug (Bsp. Ehepartner)'
								},
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						}
					},
					{
						'key': 'employee.info.personalOther',
						'type': 'group',
						'i18n': {
							'de': 'Weiteres',
							'en': 'Other'
						},
						'properties': [{
								'key': 'employee.info.nationality1',
								'type': 'select',
								'service': 'countries',
								'attachments': true,
								'i18n': {
									'de': 'Nationalität',
									'en': 'Nationality'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.nationality2',
								'type': 'select',
								'service': 'countries',
								'attachments': true,
								'i18n': {
									'de': 'Nationalität (2)',
									'en': 'Nationality (2)'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.homeTown',
								'type': 'text',
								'i18n': {
									'de': 'Heimatort',
									'en': 'Home Town',
									'info_de': 'nur bei CH notwendig',
									'info_en': 'Switzerland only'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.confession',
								'type': 'text',
								'i18n': {
									'de': 'Konfession',
									'en': 'Confession'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.maritialStatus',
								'type': 'text',
								'attachments': true,
								'i18n': {
									'de': 'Ehestand',
									'en': 'Maritial Status'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.numberOfChildren',
								'type': 'text',
								'attachments': true,
								'comment': {
									'key': 'numberOfChildren.details',
									'i18n': {
										'de': 'Details',
										'en': 'Details',
										'info_de': 'Name, Geschlecht und Geburtsdatum der Kinder',
										'info_en': 'Name, Gender and Date of Birth of Children'
									}
								},
								'i18n': {
									'de': 'Anzahl Kinder',
									'en': 'Number of Children',
									'info_de': 'Name, Geschlecht und Geburtsdatum der Kinder',
									'info_en': 'Name, Gender and Date of Birth of Children'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.info.socialSecurityNumber',
								'type': 'text',
								'attachments': true,
								'i18n': {
									'de': 'Sozialversicherungs- nummer',
									'en': 'Social Security Number'
								},
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						}
					}
				],
				'readOnly': false
			},
			{
				'key': 'contract',
				'type': 'section',
				'i18n': {
					'de': 'Arbeitsvertragliche Informationen',
					'en': 'Working Contract Informationen'
				},
				'opts': {
					'readOnly': false
				},
				'properties': [{
						'key': 'employee.contract.contractContract',
						'type': 'group',
						'i18n': {
							'de': 'Vertrag/Status',
							'en': 'Contract/Status'
						},
						'properties': [{
								'key': 'employee.contract.status',
								'mappedTo': 'state',
								'type': 'select',
								'service': 'userStatus',
								'i18n': {
									'de': 'Status',
									'en': 'Status'
								},
								'opts': {
									'readOnly': false
								},
								'value': 2
							},
							{
								'key': 'employee.contract.employee.number',
								'type': 'text',
								'mappedTo': 'employeeId',
								'i18n': {
									'de': 'Mitarbeiter Nummer',
									'en': 'Employee Id'
								},
								'opts': {
									'readOnly': false
								},
								'value': ''
							},
							{
								'key': 'employee.contract.startEnd',
								'type': 'date',
								'i18n': {
									'de': 'Eintrittsdatum',
									'en': 'Date of Entry'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.contract.startEndSCG',
								'type': 'date',
								'i18n': {
									'de': 'Eintrittsdatum SCG',
									'en': 'Date of Entry SCG'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.contract.probationEnd',
								'type': 'date',
								'i18n': {
									'de': 'Ende Probezeit',
									'en': 'End Probation'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.contract.dateOfExit',
								'type': 'date',
								'i18n': {
									'de': 'Austrittsdatum',
									'en': 'Exit Date'
								},
								'comment': {
									'key': 'dateOfExit.reason',
									'i18n': {
										'de': 'Grund',
										'en': 'Reason'
									}
								},
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						}
					},
					{
						'key': 'employee.contract.contractMembership',
						'type': 'group',
						'i18n': {
							'de': 'Organisation',
							'en': 'Organization'
						},
						'properties': [{
								'key': 'employee.contract.companyMembership',
								'type': 'list',
								'i18n': {
									'de': 'Firma',
									'en': 'Company'
								},
								'properties': [{
										'key': 'employee.contract.companyMembership.name',
										'type': 'text',
										'i18n': {
											'de': 'Name',
											'en': 'Name'
										},
										'opts': {
											'readOnly': false
										}
									},
									{
										'key': 'employee.contract.companyMembership.start',
										'type': 'date',
										'i18n': {
											'de': 'Start',
											'en': 'Start'
										},
										'opts': {
											'readOnly': false
										}
									},
									{
										'key': 'employee.contract.companyMembership.end',
										'type': 'date',
										'i18n': {
											'de': 'Ende',
											'en': 'End'
										},
										'opts': {
											'readOnly': false
										}
									}
								],
								'opts': {
									'readOnly': false
								},
								'values': {}
							},
							{
								'key': 'employee.contract.locationMembership',
								'type': 'list',
								'i18n': {
									'de': 'Standort',
									'en': 'Location'
								},
								'properties': [{
										'key': 'employee.contract.locationMembership.name',
										'type': 'text',
										'i18n': {
											'de': 'Name',
											'en': 'Name'
										},
										'opts': {
											'readOnly': false
										}
									},
									{
										'key': 'employee.contract.locationMembership.start',
										'type': 'date',
										'i18n': {
											'de': 'Start',
											'en': 'Start'
										},
										'opts': {
											'readOnly': false
										}
									},
									{
										'key': 'employee.contract.locationMembership.end',
										'type': 'date',
										'i18n': {
											'de': 'Ende',
											'en': 'End'
										},
										'opts': {
											'readOnly': false
										}
									}
								],
								'opts': {
									'readOnly': false
								},
								'values': {}
							},
							{
								'key': 'employee.contract.departmentMembership',
								'type': 'list',
								'i18n': {
									'de': 'Abteilung',
									'en': 'Department'
								},
								'properties': [{
										'key': 'employee.contract.departmentMembership.name',
										'type': 'text',
										'i18n': {
											'de': 'Name',
											'en': 'Name'
										},
										'opts': {
											'readOnly': false
										}
									},
									{
										'key': 'employee.contract.departmentMembership.start',
										'type': 'date',
										'i18n': {
											'de': 'Start',
											'en': 'Start'
										},
										'opts': {
											'readOnly': false
										}
									},
									{
										'key': 'employee.contract.departmentMembership.end',
										'type': 'date',
										'i18n': {
											'de': 'Ende',
											'en': 'End'
										},
										'opts': {
											'readOnly': false
										}
									}
								],
								'opts': {
									'readOnly': false
								},
								'values': {}
							}
						],
						'opts': {
							'readOnly': false
						}
					},
					{
						'key': 'employee.contract.contractJob',
						'type': 'group',
						'i18n': {
							'de': 'Eingliederung',
							'en': 'Details'
						},
						'properties': [{
								'key': 'employee.contract.role',
								'type': 'list',
								'i18n': {
									'de': 'Function',
									'en': 'Role'
								},
								'properties': [{
										'key': 'employee.contract.role.name',
										'type': 'text',
										'i18n': {
											'de': 'Name',
											'en': 'Name'
										},
										'opts': {
											'readOnly': false
										}
									},
									{
										'key': 'employee.contract.role.name',
										'type': 'text',
										'i18n': {
											'de': 'Vorgesetzter',
											'en': 'Manager'
										},
										'opts': {
											'readOnly': false
										}
									},
									{
										'key': 'employee.contract.role.start',
										'type': 'date',
										'i18n': {
											'de': 'Start',
											'en': 'Start'
										},
										'opts': {
											'readOnly': false
										}
									}
								],
								'opts': {
									'readOnly': false
								},
								'values': {}
							},
							{
								'type': 'text',
								'i18n': {
									'de': 'Arbeitstage (TODO)',
									'en': 'Workingdays (TODO)'
								},
								'key': 'employee.contract.undefined',
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.contract.employmentType',
								'type': 'staticlist',
								'i18n': {
									'de': 'Anstellungsart',
									'en': 'Type of Employment'
								},
								'data': [
									'Befristet',
									'Unebefristet'
								],
								'opts': {
									'readOnly': false
								},
								'values': {}
							},
							{
								'key': 'employee.contract.contractType',
								'type': 'staticlist',
								'i18n': {
									'de': 'Vertragstype',
									'en': 'Contract Type'
								},
								'data': [
									'Vollzeit',
									'Teilzeit',
									'Aushilfe'
								],
								'opts': {
									'readOnly': false
								},
								'values': {}
							},
							{
								'key': 'employee.contract.workingHoursModel',
								'type': 'staticlist',
								'i18n': {
									'de': 'Arbeitszeitmodel',
									'en': 'Working Hours Model'
								},
								'data': [
									'1',
									'2',
									'3'
								],
								'opts': {
									'readOnly': false
								},
								'values': {}
							},
							{
								'key': 'employee.contract.approvalType',
								'type': 'text',
								'i18n': {
									'de': 'Typ Bewilligung',
									'en': 'Approval Type'
								},
								'attachments': true,
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.contract.approvalProcess',
								'type': 'text',
								'i18n': {
									'de': 'Ablauf Bewilligung',
									'en': 'Approval Process'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.contract.qstRequired',
								'type': 'ifTrue',
								'i18n': {
									'de': 'QST Pflichtig',
									'en': 'QST Required'
								},
								'properties': [{
									'key': 'employee.contract.qst.tarif',
									'type': 'text',
									'i18n': {
										'de': 'Tarif',
										'en': 'Tarif'
									},
									'opts': {
										'readOnly': false
									}
								}],
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						}
					}
				],
				'readOnly': false
			},
			{
				'key': 'remuneration',
				'type': 'section',
				'i18n': {
					'de': 'Gehalt & Benefits',
					'en': 'Remuneration & Benefits'
				},
				'opts': {
					'readOnly': false
				},
				'properties': [{
						'key': 'employee.remuneration.salary',
						'type': 'list',
						'i18n': {
							'de': 'Gehalt/Lohn',
							'en': 'Salary/Wages'
						},
						'properties': [{
								'key': 'employee.remuneration.salary.start',
								'type': 'date',
								'i18n': {
									'de': 'Start',
									'en': 'Start'
								},
								'opts': {
									'readOnly': false
								},
								'value': '19.05.2017'
							},
							{
								'key': 'employee.remuneration.salary.end',
								'type': 'date',
								'i18n': {
									'de': 'Ende',
									'en': 'End'
								},
								'opts': {
									'readOnly': false
								},
								'value': '123'
							},
							{
								'key': 'employee.remuneration.salary.gross',
								'type': 'numeric',
								'i18n': {
									'de': 'Bruttogehalt',
									'en': 'Gross Salary'
								},
								'opts': {
									'readOnly': false
								},
								'value': 4500
							},
							{
								'key': 'employee.remuneration.salary.type',
								'type': 'staticlist',
								'i18n': {
									'de': 'Gehaltstyp',
									'en': 'Salary type'
								},
								'data': [
									'Pro Monat',
									'Stundenlohn',
									'Anderes(Blogger/Übersetzer)'
								],
								'opts': {
									'readOnly': false
								},
								'values': {}
							}
						],
						'opts': {
							'readOnly': false
						},
						'values': {
							'0': [{
									'index': 0,
									'sort': 0,
									'value': '19.05.2017',
									'key': 'employee.remuneration.salary.start',
									'_id': '5927cd280f202adc20e1c09c',
									'documents': []
								},
								{
									'index': 0,
									'sort': 0,
									'value': '',
									'key': 'employee.remuneration.salary.end',
									'_id': '5927cd280f202adc20e1c09d',
									'documents': []
								},
								{
									'index': 0,
									'sort': 0,
									'value': 4500,
									'key': 'employee.remuneration.salary.gross',
									'_id': '5927cd280f202adc20e1c09e',
									'documents': []
								},
								{
									'index': 0,
									'sort': 0,
									'value': 'Pro Monat',
									'key': 'employee.remuneration.salary.type',
									'_id': '5927cd280f202adc20e1c09f',
									'documents': []
								}
							]
						}
					},
					{
						'key': 'employee.remuneration.bonus',
						'type': 'list',
						'i18n': {
							'de': 'Bonus',
							'en': 'Bonus'
						},
						'properties': [{
								'key': 'employee.remuneration.bonus',
								'type': 'date',
								'i18n': {
									'de': 'Datum',
									'en': 'Date'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.remuneration.bonus.amount',
								'type': 'numeric',
								'i18n': {
									'de': 'Betrag',
									'en': 'Amount'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.remuneration.bonus.text',
								'type': 'text',
								'i18n': {
									'de': 'Text',
									'en': 'Text'
								},
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						},
						'values': {}
					},
					{
						'key': 'employee.remuneration.benefits',
						'type': 'list',
						'i18n': {
							'de': 'Zusatzbenefits/Variable Vergütung',
							'en': 'Benefits / Variable Payment'
						},
						'properties': [{
								'key': 'employee.remuneration.benefits.start',
								'type': 'date',
								'i18n': {
									'de': 'Start',
									'en': 'Start'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.remuneration.benefits.end',
								'type': 'date',
								'i18n': {
									'de': 'Ende',
									'en': 'End'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.remuneration.benefits.type',
								'type': 'text',
								'i18n': {
									'de': 'Art',
									'en': 'Type'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.remuneration.benefits.amount',
								'type': 'currency',
								'i18n': {
									'de': 'Betrag',
									'en': 'Amount'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.remuneration.benefits.text',
								'type': 'text',
								'i18n': {
									'de': 'Text',
									'en': 'Text'
								},
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						},
						'values': {}
					}
				],
				'readOnly': false
			},
			{
				'key': 'education',
				'type': 'section',
				'i18n': {
					'de': 'Aus- und Weiterbildung',
					'en': 'Education,Training & Expertise '
				},
				'opts': {
					'readOnly': false
				},
				'properties': [{
						'key': 'employee.education.education',
						'type': 'list',
						'i18n': {
							'de': 'Aus- und Weiterbildung',
							'en': 'Education and Training'
						},
						'properties': [{
								'key': 'employee.education.education.start',
								'type': 'date',
								'i18n': {
									'de': 'Start',
									'en': 'Start'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.education.education.end',
								'type': 'date',
								'i18n': {
									'de': 'Ende',
									'en': 'End'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.education.education.title',
								'type': 'text',
								'i18n': {
									'de': 'Name',
									'en': 'Name'
								},
								'attachments': true,
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						},
						'values': {}
					},
					{
						'key': 'employee.education.degree',
						'type': 'text',
						'i18n': {
							'de': 'Abschluß',
							'en': 'Degree'
						},
						'opts': {
							'readOnly': false
						}
					},
					{
						'key': 'employee.education.planed',
						'type': 'comment',
						'i18n': {
							'de': 'Geplante oder aktuelle Weiterbildungen',
							'en': 'Planned or current Training'
						},
						'opts': {
							'readOnly': false
						}
					},
					{
						'key': 'employee.education.expertise',
						'type': 'comment',
						'i18n': {
							'de': 'Fachkompetenzen',
							'en': 'Professional expertise'
						},
						'opts': {
							'readOnly': false
						}
					},
					{
						'key': 'employee.education.languages',
						'type': 'list',
						'i18n': {
							'de': 'Sprachen',
							'en': 'Languages'
						},
						'properties': [{
								'key': 'employee.education.languages.lang',
								'type': 'text',
								'i18n': {
									'de': 'Sprache',
									'en': 'Language'
								},
								'attachments': true,
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.education.languages.oral',
								'type': 'number',
								'i18n': {
									'de': 'Level Mündlich',
									'en': 'Oral Proficiency'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.education.languages.written',
								'type': 'number',
								'i18n': {
									'de': 'Level Schriftlich',
									'en': 'Written Proficiency'
								},
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						},
						'values': {}
					}
				],
				'readOnly': false
			},
			{
				'key': 'development',
				'type': 'section',
				'i18n': {
					'de': 'Mitarbeiterentwicklung',
					'en': 'Employee Development'
				},
				'opts': {
					'readOnly': false
				},
				'properties': [{
						'key': 'employee.development.reviews',
						'type': 'list',
						'i18n': {
							'de': 'Mitarbeitergespräche',
							'en': 'Reviews'
						},
						'properties': [{
								'key': 'employee.development.reviews.date',
								'type': 'date',
								'i18n': {
									'de': 'Datum',
									'en': 'Date'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.development.reviews.text',
								'type': 'comment',
								'i18n': {
									'de': 'Name',
									'en': 'Name'
								},
								'attachments': true,
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						},
						'values': {}
					},
					{
						'key': 'employee.development.targets',
						'type': 'list',
						'i18n': {
							'de': 'Zielvereinbarungen',
							'en': 'Targets'
						},
						'properties': [{
								'key': 'employee.development.targets.date',
								'type': 'date',
								'i18n': {
									'de': 'Datum',
									'en': 'Date'
								},
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.development.targets.text',
								'type': 'comment',
								'i18n': {
									'de': 'Ziele',
									'en': 'Targets'
								},
								'attachments': true,
								'opts': {
									'readOnly': false
								}
							},
							{
								'key': 'employee.development.targets.done',
								'type': 'boolean',
								'i18n': {
									'de': 'Erledigt',
									'en': 'Done'
								},
								'opts': {
									'readOnly': false
								}
							}
						],
						'opts': {
							'readOnly': false
						},
						'values': {}
					}
				],
				'readOnly': false
			},
			{
				'key': 'notes',
				'type': 'section',
				'i18n': {
					'de': 'Notizen',
					'en': 'Notes'
				},
				'opts': {
					'readOnly': false
				},
				'properties': [{
					'key': 'notes.text',
					'type': 'multitext',
					'i18n': {
						'de': 'Notizen',
						'en': 'Notes'
					},
					'attachments': true,
					'opts': {
						'readOnly': false
					}
				}],
				'readOnly': false
			}
		],
		'custom': false,
		'active': true,
		'record': '5927cd000f202adc20e1c09b'
	},
};
