/**
 * This is a hard-coded mapping of the ARA3 annotations to human readable name.
 *
 * This data is derived from http://api.brain-map.org/api/v2/structure_graph_download/1.json .
 *
 * TODO: We should write a parser for JSON ontologies.
 *
 */


export class PmaAtlas {
    constructor() {
        console.log('Princeton Mouse Atlas created!');
    }

    public getNameForId(id: number) {
        return this.ara_id.has(id) ? this.ara_id.get(id) : 'UNKNOWN';
    }

    ara_id: Map<number, string> = new Map([
        [1, '1: TMv: Tuberomammillary nucleus, ventral part'],
        [2, '2: SSp-m6b: Primary somatosensory area, mouth, layer 6b'],
        [4, '4: IC: Inferior colliculus'],
        [6, '6: int: internal capsule'],
        [7, '7: PSV: Principal sensory nucleus of the trigeminal'],
        [9, '9: SSp-tr6a: Primary somatosensory area, trunk, layer 6a'],
        [10, '10: SCig: Superior colliculus, motor related, intermediate gray layer'],
        [12, '12: IF: Interfascicular nucleus raphe'],
        [15, '15: PT: Parataenial nucleus'],
        [17, '17: SCiw: Superior colliculus, motor related, intermediate white layer'],
        [19, '19: IG: Induseum griseum'],
        [20, '20: ENTl2: Entorhinal area, lateral part, layer 2'],
        [23, '23: AAA: Anterior amygdalar area'],
        [26, '26: SCdg: Superior colliculus, motor related, deep gray layer'],
        [27, '27: IGL: Intergeniculate leaflet of the lateral geniculate complex'],
        [28, '28: ENTl6a: Entorhinal area, lateral part, layer 6a'],
        [30, '30: PVa: Periventricular hypothalamic nucleus, anterior part'],
        [33, '33: VISp6a: Primary visual area, layer 6a'],
        [35, '35: III: Oculomotor nucleus'],
        [36, '36: GU1: Gustatory areas, layer 1'],
        [38, '38: PVH: Paraventricular hypothalamic nucleus'],
        [41, '41: VISpm2/3: posteromedial visual area, layer 2/3'],
        [42, '42: SCdw: Superior colliculus, motor related, deep white layer'],
        [50, '50: PRC: Precommissural nucleus'],
        [52, '52: ENTl3: Entorhinal area, lateral part, layer 3'],
        [54, '54: mfb: medial forebrain bundle'],
        [56, '56: ACB: Nucleus accumbens'],
        [58, '58: MT: Medial terminal nucleus of the accessory optic tract'],
        [59, '59: IMD: Intermediodorsal nucleus of the thalamus'],
        [62, '62: mlf: medial longitudinal fascicle'],
        [63, '63: PVHd: Paraventricular hypothalamic nucleus, descending division'],
        [64, '64: AD: Anterodorsal nucleus'],
        [66, '66: LT: Lateral terminal nucleus of the accessory optic tract'],
        [67, '67: INC: Interstitial nucleus of Cajal'],
        [68, '68: FRP1: Frontal pole, layer 1'],
        [72, '72: ADP: Anterodorsal preoptic nucleus'],
        [73, '73: VS: ventricular systems'],
        [74, '74: VISl6a: Lateral visual area, layer 6a'],
        [75, '75: DT: Dorsal terminal nucleus of the accessory optic tract'],
        [78, '78: mcp: middle cerebellar peduncle'],
        [81, '81: VL: lateral ventricle'],
        [83, '83: IO: Inferior olivary complex'],
        [84, '84: PL6a: Prelimbic area, layer 6a'],
        [88, '88: AHN: Anterior hypothalamic nucleus'],
        [91, '91: IP: Interposed nucleus'],
        [93, '93: moV: motor root of the trigeminal nerve'],
        [96, '96: DCO: Dorsal cochlear nucleus'],
        [97, '97: TEa1: Temporal association areas, layer 1'],
        [98, '98: SEZ: subependymal zone'],
        [100, '100: IPN: Interpeduncular nucleus'],
        [101, '101: VCO: Ventral cochlear nucleus'],
        [102, '102: nst: nigrostriatal tract'],
        [105, '105: SOCm: Superior olivary complex, medial part'],
        [106, '106: ISN: Inferior salivatory nucleus'],
        [108, '108: chpl: choroid plexus'],
        [113, '113: SSp-ll2/3: Primary somatosensory area, lower limb, layer 2/3'],
        [114, '114: SOCl: Superior olivary complex, lateral part'],
        [115, '115: IV: Trochlear nucleus'],
        [117, '117: och: optic chiasm'],
        [118, '118: PVi: Periventricular hypothalamic nucleus, intermediate part'],
        [120, '120: AIp1: Agranular insular area, posterior part, layer 1'],
        [121, '121: VISl6b: Lateral visual area, layer 6b'],
        [122, '122: POR: Superior olivary complex, periolivary region'],
        [123, '123: KF: Koelliker-Fuse subnucleus'],
        [125, '125: opt: optic tract'],
        [126, '126: PVp: Periventricular hypothalamic nucleus, posterior part'],
        [128, '128: MRN: Midbrain reticular nucleus'],
        [129, '129: V3: third ventricle'],
        [131, '131: LA: Lateral amygdalar nucleus'],
        [133, '133: PVpo: Periventricular hypothalamic nucleus, preoptic part'],
        [136, '136: IRN: Intermediate reticular nucleus'],
        [139, '139: ENTl5: Entorhinal area, lateral part, layer 5'],
        [140, '140: AQ: cerebral aqueduct'],
        [143, '143: AMBv: Nucleus ambiguus, ventral division'],
        [145, '145: V4: fourth ventricle'],
        [146, '146: PRNr: Pontine reticular nucleus'],
        [147, '147: LC: Locus ceruleus'],
        [148, '148: GU4: Gustatory areas, layer 4'],
        [149, '149: PVT: Paraventricular nucleus of the thalamus'],
        [153, '153: V4r: lateral recess'],
        [155, '155: LD: Lateral dorsal nucleus of thalamus'],
        [156, '156: AUDd6a: Dorsal auditory area, layer 6a'],
        [158, '158: pc: posterior commissure'],
        [159, '159: AON: Anterior olfactory nucleus'],
        [162, '162: LDT: Laterodorsal tegmental nucleus'],
        [163, '163: AIp2/3: Agranular insular area, posterior part, layer 2/3'],
        [164, '164: c: central canal, spinal cord/medulla'],
        [169, '169: PRP: Nucleus prepositus'],
        [170, '170: LGd: Dorsal part of the lateral geniculate complex'],
        [171, '171: PL1: Prelimbic area, layer 1'],
        [173, '173: RCH: Retrochiasmatic area'],
        [177, '177: NR: Nucleus of Roller'],
        [178, '178: LGv: Ventral part of the lateral geniculate complex'],
        [180, '180: GU2/3: Gustatory areas, layer 2/3'],
        [181, '181: RE: Nucleus of reuniens'],
        [186, '186: LH: Lateral habenula'],
        [187, '187: GU5: Gustatory areas, layer 5'],
        [188, '188: AOBgl: Accessory olfactory bulb, glomerular layer'],
        [189, '189: RH: Rhomboid nucleus'],
        [190, '190: py: pyramid'],
        [194, '194: LHA: Lateral hypothalamic area'],
        [196, '196: AOBgr: Accessory olfactory bulb, granular layer'],
        [197, '197: RL: Rostral linear nucleus raphe'],
        [198, '198: pyd: pyramidal decussation'],
        [201, '201: SSp-bfd2/3: Primary somatosensory area, barrel field, layer 2/3'],
        [202, '202: MV: Medial vestibular nucleus'],
        [203, '203: LIN: Linear nucleus of the medulla'],
        [204, '204: AOBmi: Accessory olfactory bulb, mitral layer'],
        [206, '206: RM: Nucleus raphe magnus'],
        [207, '207: AP: Area postrema'],
        [209, '209: LAV: Lateral vestibular nucleus'],
        [210, '210: LM: Lateral mammillary nucleus'],
        [211, '211: ACAd2/3: Anterior cingulate area, dorsal part, layer 2/3'],
        [214, '214: RN: Red nucleus'],
        [215, '215: APN: Anterior pretectal nucleus'],
        [217, '217: SUV: Superior vestibular nucleus'],
        [218, '218: LP: Lateral posterior nucleus of the thalamus'],
        [222, '222: RO: Nucleus raphe obscurus'],
        [223, '223: ARH: Arcuate hypothalamic nucleus'],
        [225, '225: SPIV: Spinal vestibular nucleus'],
        [226, '226: LPO: Lateral preoptic area'],
        [229, '229: sV: sensory root of the trigeminal nerve'],
        [230, '230: RPA: Nucleus raphe pallidus'],
        [231, '231: AT: Anterior tegmental nucleus'],
        [233, '233: VISal5: Anterolateral visual area, layer 5'],
        [234, '234: TEa4: Temporal association areas, layer 4'],
        [237, '237: ts: solitary tract'],
        [238, '238: RPO: Nucleus raphe pontis'],
        [243, '243: AUDd6b: Dorsal auditory area, layer 6b'],
        [246, '246: RR: Midbrain reticular nucleus, retrorubral area'],
        [249, '249: AUDpo6a: Posterior auditory area, layer 6a'],
        [250, '250: LSc: Lateral septal nucleus, caudal (caudodorsal) part'],
        [251, '251: AUDp2/3: Primary auditory area, layer 2/3'],
        [252, '252: AUDd5: Dorsal auditory area, layer 5'],
        [255, '255: AV: Anteroventral nucleus of thalamus'],
        [257, '257: VISpm6a: posteromedial visual area, layer 6a'],
        [258, '258: LSr: Lateral septal nucleus, rostral (rostroventral) part'],
        [260, '260: NLOT1: Nucleus of the lateral olfactory tract, molecular layer'],
        [262, '262: RT: Reticular nucleus of the thalamus'],
        [263, '263: AVP: Anteroventral preoptic nucleus'],
        [266, '266: LSv: Lateral septal nucleus, ventral part'],
        [268, '268: NLOT2: Nucleus of the lateral olfactory tract, pyramidal layer'],
        [269, '269: VISpl2/3: Posterolateral visual area, layer 2/3'],
        [271, '271: SAG: Nucleus sagulum'],
        [272, '272: AVPV: Anteroventral periventricular nucleus'],
        [274, '274: RSPd6a: Retrosplenial area, dorsal part, layer 6a'],
        [278, '278: sAMY: Striatum-like amygdalar nuclei'],
        [279, '279: RSPagl6b: Retrosplenial area, lateral agranular part, layer 6b'],
        [280, "280: B: Barrington's nucleus"],
        [281, '281: VISam1: Anteromedial visual area, layer 1'],
        [286, '286: SCH: Suprachiasmatic nucleus'],
        [287, '287: BAC: Bed nucleus of the anterior commissure'],
        [288, '288: ORBvl2/3: Orbital area, ventrolateral part, layer 2/3'],
        [289, '289: TEa5: Temporal association areas, layer 5'],
        [292, '292: BA: Bed nucleus of the accessory olfactory tract'],
        [296, '296: ACAv2/3: Anterior cingulate area, ventral part, layer 2/3'],
        [298, '298: MA: Magnocellular nucleus'],
        [301, '301: st: stria terminalis'],
        [303, '303: BLAa: Basolateral amygdalar nucleus, anterior part'],
        [304, '304: PL2/3: Prelimbic area, layer 2/3'],
        [305, '305: VISp6b: Primary visual area, layer 6b'],
        [307, '307: MARN: Magnocellular reticular nucleus'],
        [310, '310: SF: Septofimbrial nucleus'],
        [311, '311: BLAp: Basolateral amygdalar nucleus, posterior part'],
        [313, '313: MB: Midbrain'],
        [314, '314: AIp6a: Agranular insular area, posterior part, layer 6a'],
        [318, '318: SG: Supragenual nucleus'],
        [319, '319: BMA: Basomedial amygdalar nucleus'],
        [320, '320: MOp1: Primary motor area, Layer 1'],
        [321, '321: SubG: Subgeniculate nucleus'],
        [325, '325: SGN: Suprageniculate nucleus'],
        [326, '326: scp: superior cerebelar peduncles'],
        [327, '327: BMAa: Basomedial amygdalar nucleus, anterior part'],
        [328, '328: AId2/3: Agranular insular area, dorsal part, layer 2/3'],
        [330, '330: RSPd6b: Retrosplenial area, dorsal part, layer 6b'],
        [332, '332: ASO: Accessory supraoptic group'],
        [333, '333: SH: Septohippocampal nucleus'],
        [334, '334: BMAp: Basomedial amygdalar nucleus, posterior part'],
        [335, '335: PERI6a: Perirhinal area, layer 6a'],
        [336, '336: csc: superior colliculus commissure'],
        [338, '338: SFO: Subfornical organ'],
        [342, '342: SI: Substantia innominata'],
        [344, '344: AIp5: Agranular insular area, posterior part, layer 5'],
        [347, '347: SBPV: Subparaventricular zone'],
        [349, '349: sup: supraoptic commissures'],
        [350, '350: SLC: Subceruleus nucleus'],
        [351, '351: BST: Bed nuclei of the stria terminalis'],
        [354, '354: MY: Medulla'],
        [355, '355: AIp6b: Agranular insular area, posterior part, layer 6b'],
        [356, '356: PST: Preparasubthalamic nucleus'],
        [358, '358: SLD: Sublaterodorsal nucleus'],
        [362, '362: MD: Mediodorsal nucleus of thalamus'],
        [363, '363: PL5: Prelimbic area, layer 5'],
        [364, '364: PSTN: Parasubthalamic nucleus'],
        [366, '366: SMT: Submedial nucleus of the thalamus'],
        [368, '368: PERI6b: Perirhinal area, layer 6b'],
        [372, '372: ICB: Infracerebellar nucleus'],
        [374, '374: SNc: Substantia nigra, compact part'],
        [377, '377: VISpl6a: Posterolateral visual area, layer 6a'],
        [380, '380: cuf: cuneate fascicle'],
        [381, '381: SNr: Substantia nigra, reticular part'],
        [382, '382: CA1: Field CA1'],
        [388, '388: grf: gracile fascicle'],
        [390, '390: SO: Supraoptic nucleus'],
        [393, '393: VISpl6b: Posterolateral visual area, layer 6b'],
        [397, '397: vtd: ventral tegmental decussation'],
        [401, '401: VISam4: Anteromedial visual area, layer 4'],
        [403, '403: MEA: Medial amygdalar nucleus'],
        [412, '412: ORBl2/3: Orbital area, lateral part, layer 2/3'],
        [413, '413: vVIIIn: vestibular nerve'],
        [414, '414: SPFm: Subparafascicular nucleus, magnocellular part'],
        [421, '421: VISl1: Lateral visual area, layer 1'],
        [422, '422: SPFp: Subparafascicular nucleus, parvicellular part'],
        [423, '423: CA2: Field CA2'],
        [427, '427: ECT2/3: Ectorhinal area/Layer 2/3'],
        [428, '428: mct: medial corticohypothalamic tract'],
        [429, '429: SPVC: Spinal nucleus of the trigeminal, caudal part'],
        [430, '430: RSPv2/3: Retrosplenial area, ventral part, layer 2/3'],
        [433, '433: VISam5: Anteromedial visual area, layer 5'],
        [434, '434: RSPd2/3: Retrosplenial area, dorsal part, layer 2/3'],
        [436, '436: fx: columns of the fornix'],
        [437, '437: SPVI: Spinal nucleus of the trigeminal, interpolar part'],
        [440, '440: ORBl6a: Orbital area, lateral part, layer 6a'],
        [441, '441: VISam6b: Anteromedial visual area, layer 6b'],
        [442, '442: RSPd1: Retrosplenial area, dorsal part, layer 1'],
        [443, '443: dhc: dorsal hippocampal commissure'],
        [445, '445: SPVO: Spinal nucleus of the trigeminal, oral part'],
        [448, '448: ORBl1: Orbital area, lateral part, layer 1'],
        [449, '449: vhc: ventral hippocampal commissure'],
        [450, '450: SSp-ul1: Primary somatosensory area, upper limb, layer 1'],
        [451, '451: BLAv: Basolateral amygdalar nucleus, ventral part'],
        [452, '452: MEPO: Median preoptic nucleus'],
        [456, '456: AUDpo6b: Posterior auditory area, layer 6b'],
        [460, '460: MEV: Midbrain trigeminal nucleus'],
        [461, '461: SSp-tr6b: Primary somatosensory area, trunk, layer 6b'],
        [463, '463: CA3: Field CA3'],
        [466, '466: alv: alveus'],
        [469, '469: VISpm6b: posteromedial visual area, layer 6b'],
        [470, '470: STN: Subthalamic nucleus'],
        [475, '475: MG: Medial geniculate complex'],
        [477, '477: STR: Striatum'],
        [478, '478: SSp-ll6a: Primary somatosensory area, lower limb, layer 6a'],
        [482, '482: bic: brachium of the inferior colliculus'],
        [483, '483: MH: Medial habenula'],
        [484, '484: ORBm1: Orbital area, medial part, layer 1'],
        [488, '488: ORBl6b: Orbital area, lateral part, layer 6b'],
        [491, '491: MM: Medial mammillary nucleus'],
        [494, '494: SCig-a: Superior colliculus, motor related, intermediate gray layer, sublayer a'],
        [501, '501: VISpm4: posteromedial visual area, layer 4'],
        [502, '502: SUB: Subiculum'],
        [503, '503: SCig-b: Superior colliculus, motor related, intermediate gray layer, sublayer b'],
        [506, '506: das: dorsal acoustic stria'],
        [507, '507: MOB: Main olfactory bulb'],
        [510, '510: SSp-ll6b: Primary somatosensory area, lower limb, layer 6b'],
        [512, '512: CB: Cerebellum'],
        [515, '515: MPN: Medial preoptic nucleus'],
        [520, '520: AUDv6a: Ventral auditory area, layer 6a'],
        [523, '523: MPO: Medial preoptic area'],
        [525, '525: SUM: Supramammillary nucleus'],
        [526, '526: ENTm1: Entorhinal area, medial part, dorsal zone, layer 1'],
        [527, '527: AUDd1: Dorsal auditory area, layer 1'],
        [530, '530: df: dorsal fornix'],
        [531, '531: MPT: Medial pretectal area'],
        [534, '534: SUT: Supratrigeminal nucleus'],
        [538, '538: lotd: dorsal limb'],
        [540, '540: PERI1: Perirhinal area, layer 1'],
        [542, '542: RSPv1: Retrosplenial area, ventral part, layer 1'],
        [543, '543: ENTm2: Entorhinal area, medial part, dorsal zone, layer 2'],
        [544, '544: CEAc: Central amygdalar nucleus, capsular part'],
        [545, '545: RSPd4: Retrosplenial area, dorsal part, layer 4'],
        [549, '549: TH: Thalamus'],
        [551, '551: CEAl: Central amygdalar nucleus, lateral part'],
        [553, '553: sctd: dorsal spinocerebellar tract'],
        [556, '556: ILA2/3: Infralimbic area, layer 2/3'],
        [558, '558: SSp-n1: Primary somatosensory area, nose, layer 1'],
        [559, '559: CEAm: Central amygdalar nucleus, medial part'],
        [564, '564: MS: Medial septal nucleus'],
        [565, '565: VISpm5: posteromedial visual area, layer 5'],
        [566, '566: TR: Postpiriform transition area'],
        [573, '573: VISl4: Lateral visual area, layer 4'],
        [574, '574: TRN: Tegmental reticular nucleus'],
        [575, '575: CL: Central lateral nucleus of the thalamus'],
        [576, '576: ACVII: Accessory facial motor nucleus'],
        [577, '577: SSp-ul4: Primary somatosensory area, upper limb, layer 4'],
        [579, '579: ec: external capsule'],
        [580, '580: NB: Nucleus of the brachium of the inferior colliculus'],
        [581, '581: TRS: Triangular nucleus of septum'],
        [582, '582: ORBm2/3: Orbital area, medial part, layer 2/3'],
        [583, '583: CLA: Claustrum'],
        [587, '587: ND: Nucleus of Darkschewitsch'],
        [588, '588: ACAv1: Anterior cingulate area, ventral part, layer 1'],
        [589, '589: TT: Taenia tecta'],
        [590, '590: RSPv6a: Retrosplenial area, ventral part, layer 6a'],
        [591, '591: CLI: Central linear nucleus raphe'],
        [593, '593: VISp1: Primary visual area, layer 1'],
        [595, '595: fr: fasciculus retroflexus'],
        [596, '596: NDB: Diagonal band nucleus'],
        [597, '597: TTd: Taenia tecta, dorsal part'],
        [598, '598: AUDv6b: Ventral auditory area, layer 6b'],
        [599, '599: CM: Central medial nucleus of the thalamus'],
        [600, '600: AUDd2/3: Dorsal auditory area, layer 2/3'],
        [601, '601: VISal6a: Anterolateral visual area, layer 6a'],
        [603, '603: fi: fimbria'],
        [604, '604: NI: Nucleus incertus'],
        [605, '605: TTv: Taenia tecta, ventral part'],
        [608, '608: ORBvl6a: Orbital area, ventrolateral part, layer 6a'],
        [609, '609: SPA: Subparafascicular area'],
        [610, '610: RSPd5: Retrosplenial area, dorsal part, layer 5'],
        [611, '611: hbc: habenular commissure'],
        [612, '612: NLL: Nucleus of the lateral lemniscus'],
        [613, '613: VISl5: Lateral visual area, layer 5'],
        [614, '614: TU: Tuberal nucleus'],
        [616, '616: CUN: Cuneiform nucleus'],
        [620, '620: ORBm5: Orbital area, medial part, layer 5'],
        [621, '621: V: Motor nucleus of trigeminal'],
        [622, '622: RSPv6b: Retrosplenial area, ventral part, layer 6b'],
        [625, '625: SSp-ul5: Primary somatosensory area, upper limb, layer 5'],
        [628, '628: NOT: Nucleus of the optic tract'],
        [629, '629: VAL: Ventral anterior-lateral complex of the thalamus'],
        [630, '630: ORBl5: Orbital area, lateral part, layer 5'],
        [632, '632: DG-sg: Dentate gyrus, granule cell layer'],
        [633, '633: cic: inferior colliculus commissure'],
        [634, '634: NPC: Nucleus of the posterior commissure'],
        [638, '638: GU6a: Gustatory areas, layer 6a'],
        [639, '639: COAa: Cortical amygdalar area, anterior part'],
        [642, '642: NTB: Nucleus of the trapezoid body'],
        [643, '643: AUDpo2/3: Posterior auditory area, layer 2/3'],
        [647, '647: COAp: Cortical amygdalar area, posterior part'],
        [648, '648: MOp5: Primary motor area, Layer 5'],
        [649, '649: VISal6b: Anterolateral visual area, layer 6b'],
        [651, '651: NTS: Nucleus of the solitary tract'],
        [653, '653: VI: Abducens nucleus'],
        [654, '654: SSp-n4: Primary somatosensory area, nose, layer 4'],
        [655, '655: COApl: Cortical amygdalar area, posterior part, lateral zone'],
        [656, '656: MOs1: Secondary motor area, layer 1'],
        [657, '657: SSp-m2/3: Primary somatosensory area, mouth, layer 2/3'],
        [658, '658: ll: lateral lemniscus'],
        [661, '661: VII: Facial motor nucleus'],
        [662, '662: GU6b: Gustatory areas, layer 6b'],
        [663, '663: COApm: Cortical amygdalar area, posterior part, medial zone'],
        [664, '664: ENTm3: Entorhinal area, medial part, dorsal zone, layer 3'],
        [665, '665: lot: lateral olfactory tract, body'],
        [667, '667: FRP2/3: Frontal pole, layer 2/3'],
        [669, '669: VIS: Visual areas'],
        [670, '670: SSp-tr2/3: Primary somatosensory area, trunk, layer 2/3'],
        [671, '671: RSPagl1: Retrosplenial area, lateral agranular part, layer 1'],
        [672, '672: CP: Caudoputamen'],
        [673, '673: mp: mammillary peduncle'],
        [675, '675: AIv6a: Agranular insular area, ventral part, layer 6a'],
        [678, '678: AUDd4: Dorsal auditory area, layer 4'],
        [679, '679: CS: Superior central nucleus raphe'],
        [680, '680: ORBvl6b: Orbital area, ventrolateral part, layer 6b'],
        [681, '681: mtg: mammillotegmental tract'],
        [685, '685: VM: Ventral medial nucleus of the thalamus'],
        [687, '687: RSPv5: Retrosplenial area, ventral part, layer 5'],
        [689, '689: VLPO: Ventrolateral preoptic nucleus'],
        [690, '690: mtt: mammillothalamic tract'],
        [692, '692: PERI5: Perirhinal area, layer 5'],
        [693, '693: VMH: Ventromedial hypothalamic nucleus'],
        [694, '694: AIv2/3: Agranular insular area, ventral part, layer 2/3'],
        [696, '696: AUDpo1: Posterior auditory area, layer 1'],
        [697, '697: ml: medial lemniscus'],
        [698, '698: OLF: Olfactory areas'],
        [699, '699: AIv6b: Agranular insular area, ventral part, layer 6b'],
        [702, '702: SSp-n5: Primary somatosensory area, nose, layer 5'],
        [703, '703: CTXsp: Cortical subplate'],
        [704, '704: AIv1: Agranular insular area, ventral part, layer 1'],
        [706, '706: OP: Olivary pretectal nucleus'],
        [707, '707: ILA1: Infralimbic area, layer 1'],
        [711, '711: CU: Cuneate nucleus'],
        [718, '718: VPL: Ventral posterolateral nucleus of the thalamus'],
        [721, '721: VISp4: Primary visual area, layer 4'],
        [725, '725: VPLpc: Ventral posterolateral nucleus of the thalamus, parvicellular part'],
        [727, '727: ENTm5: Entorhinal area, medial part, dorsal zone, layer 5'],
        [728, '728: arb: arbor vitae'],
        [729, '729: TEa6a: Temporal association areas, layer 6a'],
        [732, '732: MMme: Medial mammillary nucleus, median part'],
        [733, '733: VPM: Ventral posteromedial nucleus of the thalamus'],
        [735, '735: AUDp1: Primary auditory area, layer 1'],
        [741, '741: VPMpc: Ventral posteromedial nucleus of the thalamus, parvicellular part'],
        [743, '743: ENTm6: Entorhinal area, medial part, dorsal zone, layer 6'],
        [744, '744: cbc: cerebellar commissure'],
        [749, '749: VTA: Ventral tegmental area'],
        [750, '750: VISpl1: Posterolateral visual area, layer 1'],
        [753, '753: pm: principal mammillary tract'],
        [754, '754: OT: Olfactory tubercle'],
        [755, '755: AUDv2/3: Ventral auditory area, layer 2/3'],
        [757, '757: VTN: Ventral tegmental nucleus'],
        [759, '759: AUDpo4: Posterior auditory area, layer 4'],
        [763, '763: OV: Vascular organ of the lamina terminalis'],
        [765, '765: x: Nucleus x'],
        [767, '767: MOs5: Secondary motor area, layer 5'],
        [771, '771: P: Pons'],
        [772, '772: ACAv5: Anterior cingulate area, ventral part, layer 5'],
        [773, '773: XII: Hypoglossal nucleus'],
        [774, '774: RSPagl5: Retrosplenial area, lateral agranular part, layer 5'],
        [776, '776: cc: corpus callosum'],
        [778, '778: VISp5: Primary visual area, layer 5'],
        [780, '780: PA: Posterior amygdalar nucleus'],
        [781, '781: y: Nucleus y'],
        [783, '783: AId6a: Agranular insular area, dorsal part, layer 6a'],
        [784, '784: cst: corticospinal tract'],
        [786, '786: TEa6b: Temporal association areas, layer 6b'],
        [788, '788: PAA: Piriform-amygdalar area'],
        [791, '791: AUDpo5: Posterior auditory area, layer 5'],
        [794, '794: sptV: spinal tract of the trigeminal nerve'],
        [795, '795: PAG: Periaqueductal gray'],
        [797, '797: ZI: Zona incerta'],
        [798, '798: VIIn: facial nerve'],
        [800, '800: AIv5: Agranular insular area, ventral part, layer 5'],
        [802, '802: sm: stria medullaris'],
        [803, '803: PAL: Pallidum'],
        [804, '804: FF: Fields of Forel'],
        [805, '805: VISpm1: posteromedial visual area, layer 1'],
        [806, '806: SSs2/3: Supplemental somatosensory area, layer 2/3'],
        [810, '810: ACAv6a: Anterior cingulate area, ventral part, 6a'],
        [811, '811: ICc: Inferior colliculus, central nucleus'],
        [812, '812: dscp: superior cerebellar peduncle decussation'],
        [814, '814: DP: Dorsal peduncular area'],
        [816, '816: AUDp4: Primary auditory area, layer 4'],
        [819, '819: ACAv6b: Anterior cingulate area, ventral part, 6b'],
        [820, '820: ICd: Inferior colliculus, dorsal nucleus'],
        [821, '821: VISp2/3: Primary visual area, layer 2/3'],
        [827, '827: ILA5: Infralimbic area, layer 5'],
        [828, '828: ICe: Inferior colliculus, external nucleus'],
        [830, '830: DMH: Dorsomedial nucleus of the hypothalamus'],
        [831, '831: AId6b: Agranular insular area, dorsal part, layer 6b'],
        [832, '832: IIIn: oculomotor nerve'],
        [834, '834: SCzo: Superior colliculus, zonal layer'],
        [836, '836: ECT1: Ectorhinal area/Layer 1'],
        [838, '838: SSp-n2/3: Primary somatosensory area, nose, layer 2/3'],
        [839, '839: DMX: Dorsal motor nucleus of the vagus nerve'],
        [841, '841: tb: trapezoid body'],
        [842, '842: SCsg: Superior colliculus, superficial gray layer'],
        [843, '843: PAR: Parasubiculum'],
        [844, '844: MOp6a: Primary motor area, Layer 6a'],
        [846, '846: DN: Dentate nucleus'],
        [847, '847: AUDp5: Primary auditory area, layer 5'],
        [848, '848: IIn: optic nerve'],
        [849, '849: VISC6b: Visceral area, layer 6b'],
        [850, '850: uf: uncinate fascicle'],
        [851, '851: SCop: Superior colliculus, optic layer'],
        [852, '852: PARN: Parvicellular reticular nucleus'],
        [854, '854: SSp-ul2/3: Primary somatosensory area, upper limb, layer 2/3'],
        [857, '857: VISC6a: Visceral area, layer 6a'],
        [859, '859: PAS: Parasolitary nucleus'],
        [862, '862: SSs6a: Supplemental somatosensory area, layer 6a'],
        [863, '863: rust: rubrospinal tract'],
        [866, '866: sctv: ventral spinocerebellar tract'],
        [867, '867: PB: Parabrachial nucleus'],
        [869, '869: VISpl4: Posterolateral visual area, layer 4'],
        [872, '872: DR: Dorsal nucleus raphe'],
        [873, '873: SSs1: Supplemental somatosensory area, layer 1'],
        [874, '874: PBG: Parabigeminal nucleus'],
        [878, '878: SSp-m1: Primary somatosensory area, mouth, layer 1'],
        [880, '880: DTN: Dorsal tegmental nucleus'],
        [882, '882: MOp6b: Primary motor area, Layer 6b'],
        [884, '884: amc: amygdalar capsule'],
        [888, '888: PERI2/3: Perirhinal area, layer 2/3'],
        [889, '889: SSp-n6a: Primary somatosensory area, nose, layer 6a'],
        [893, '893: SSs6b: Supplemental somatosensory area, layer 6b'],
        [897, '897: VISC1: Visceral area, layer 1'],
        [898, '898: PCG: Pontine central gray'],
        [900, '900: aco: anterior commissure, olfactory limb'],
        [902, '902: VISpl5: Posterolateral visual area, layer 5'],
        [903, '903: ECU: External cuneate nucleus'],
        [905, '905: VISal2/3: Anterolateral visual area, layer 2/3'],
        [906, '906: RSPagl6a: Retrosplenial area, lateral agranular part, layer 6a'],
        [907, '907: PCN: Paracentral nucleus'],
        [908, '908: act: anterior commissure, temporal limb'],
        [910, '910: ORBm6a: Orbital area, medial part, layer 6a'],
        [911, '911: IVn: trochlear nerve'],
        [912, '912: LING: Lingula (I)'],
        [914, '914: PD: Posterodorsal preoptic nucleus'],
        [916, '916: bsc: brachium of the superior colliculus'],
        [918, '918: ENTl: Entorhinal area, lateral part'],
        [919, '919: ACAd6a: Anterior cingulate area, dorsal part, layer 6a'],
        [924, '924: cpd: cerebal peduncle'],
        [926, '926: ENTm: Entorhinal area, medial part, dorsal zone'],
        [927, '927: ACAd6b: Anterior cingulate area, dorsal part, layer 6b'],
        [929, '929: SSp-n6b: Primary somatosensory area, nose, layer 6b'],
        [930, '930: PF: Parafascicular nucleus'],
        [931, '931: PG: Pontine gray'],
        [934, '934: ENTmv: Entorhinal area, medial part, ventral zone'],
        [935, '935: ACAd1: Anterior cingulate area, dorsal part, layer 1'],
        [936, '936: DEC6a: Declive (VI), subdivision A'],
        [939, '939: AMBd: Nucleus ambiguus, dorsal division'],
        [940, '940: cing: cingulum bundle'],
        [943, '943: MOp2/3: Primary motor area, Layer 2/3'],
        [944, '944: FOTU: Folium-tuber vermis (VII)'],
        [945, '945: SSp-ul6a: Primary somatosensory area, upper limb, layer 6a'],
        [946, '946: PH: Posterior hypothalamic nucleus'],
        [949, '949: von: vomeronasal nerve'],
        [950, '950: SSp-m4: Primary somatosensory area, mouth, layer 4'],
        [951, '951: PYR: Pyramus (VIII)'],
        [952, '952: EPd: Endopiriform nucleus, dorsal part'],
        [954, '954: AUDp6a: Primary auditory area, layer 6a'],
        [955, '955: LRNm: Lateral reticular nucleus, magnocellular part'],
        [956, '956: fa: corpus callosum, anterior forceps'],
        [957, '957: UVU: Uvula (IX)'],
        [959, '959: AUDv1: Ventral auditory area, layer 1'],
        [961, '961: PIR: Piriform area'],
        [962, '962: MOs2/3: Secondary motor area, layer 2/3'],
        [963, '963: LRNp: Lateral reticular nucleus, parvicellular part'],
        [964, '964: ee: corpus callosum, extreme capsule'],
        [965, '965: RSPagl2/3: Retrosplenial area, lateral agranular part, layer 2/3'],
        [966, '966: EPv: Endopiriform nucleus, ventral part'],
        [968, '968: NOD: Nodulus (X)'],
        [969, '969: ORBvl1: Orbital area, ventrolateral part, layer 1'],
        [970, '970: PGRNd: Paragigantocellular reticular nucleus, dorsal part'],
        [971, '971: fp: corpus callosum, posterior forceps'],
        [973, '973: VISl2/3: Lateral visual area, layer 2/3'],
        [974, '974: SSp-m5: Primary somatosensory area, mouth, layer 5'],
        [975, '975: EW: Edinger-Westphal nucleus'],
        [976, '976: CENT2: Lobule II'],
        [977, '977: ECT6a: Ectorhinal area/Layer 6a'],
        [978, '978: PGRNl: Paragigantocellular reticular nucleus, lateral part'],
        [980, '980: PMd: Dorsal premammillary nucleus'],
        [981, '981: SSp-bfd1: Primary somatosensory area, barrel field, layer 1'],
        [982, '982: FC: Fasciola cinerea'],
        [984, '984: CENT3: Lobule III'],
        [986, '986: ccs: corpus callosum, splenium'],
        [988, '988: ECT5: Ectorhinal area/Layer 5'],
        [989, '989: FN: Fastigial nucleus'],
        [990, '990: AUDv4: Ventral auditory area, layer 4'],
        [996, '996: AId1: Agranular insular area, dorsal part, layer 1'],
        [997, '997: root: root'],
        [998, '998: FS: Fundus of striatum'],
        [1004, '1004: PMv: Ventral premammillary nucleus'],
        [1005, '1005: AUDp6b: Primary auditory area, layer 6b'],
        [1006, '1006: SSp-tr1: Primary somatosensory area, trunk, layer 1'],
        [1007, '1007: SIM: Simplex lobule'],
        [1009, '1009: fiber tracts: fiber tracts'],
        [1010, '1010: VISC4: Visceral area, layer 4'],
        [1015, '1015: ACAd5: Anterior cingulate area, dorsal part, layer 5'],
        [1016, '1016: onl: olfactory nerve layer of main olfactory bulb'],
        [1020, '1020: PO: Posterior complex of the thalamus'],
        [1021, '1021: MOs6a: Secondary motor area, layer 6a'],
        [1022, '1022: GPe: Globus pallidus, external segment'],
        [1023, '1023: AUDv5: Ventral auditory area, layer 5'],
        [1025, '1025: PRM: Paramedian lobule'],
        [1026, '1026: SSp-ul6b: Primary somatosensory area, upper limb, layer 6b'],
        [1029, '1029: POL: Posterior limiting nucleus of the thalamus'],
        [1030, '1030: SSp-ll1: Primary somatosensory area, lower limb, layer 1'],
        [1031, '1031: GPi: Globus pallidus, internal segment'],
        [1033, '1033: COPY: Copula pyramidis'],
        [1035, '1035: SSs4: Supplemental somatosensory area, layer 4'],
        [1037, '1037: POST: Postsubiculum'],
        [1038, '1038: SSp-bfd6a: Primary somatosensory area, barrel field, layer 6a'],
        [1039, '1039: GR: Gracile nucleus'],
        [1041, '1041: PFL: Paraflocculus'],
        [1043, '1043: tspc: crossed tectospinal pathway'],
        [1044, '1044: PP: Peripeduncular nucleus'],
        [1045, '1045: ECT6b: Ectorhinal area/Layer 6b'],
        [1046, '1046: VISam6a: Anteromedial visual area, layer 6a'],
        [1047, '1047: SSp-bfd4: Primary somatosensory area, barrel field, layer 4'],
        [1048, '1048: GRN: Gigantocellular reticular nucleus'],
        [1049, '1049: FL: Flocculus'],
        [1051, '1051: tspd: direct tectospinal pathway'],
        [1052, '1052: PPN: Pedunculopontine nucleus'],
        [1054, '1054: ILA6a: Infralimbic area, layer 6a'],
        [1056, '1056: ANcr1: Crus 1'],
        [1058, '1058: VISC5: Visceral area, layer 5'],
        [1060, '1060: dtd: doral tegmental decussation'],
        [1061, '1061: PPT: Posterior pretectal nucleus'],
        [1062, '1062: SSp-bfd6b: Primary somatosensory area, barrel field, layer 6b'],
        [1064, '1064: ANcr2: Crus 2'],
        [1066, '1066: VISam2/3: Anteromedial visual area, layer 2/3'],
        [1069, '1069: PPY: Parapyramidal nucleus'],
        [1070, '1070: SSp-bfd5: Primary somatosensory area, barrel field, layer 5'],
        [1072, '1072: MGd: Medial geniculate complex, dorsal part'],
        [1074, '1074: VISal1: Anterolateral visual area, layer 1'],
        [1077, '1077: PR: Perireunensis nucleus'],
        [1079, '1079: MGv: Medial geniculate complex, ventral part'],
        [1081, '1081: ILA6b: Infralimbic area, layer 6b'],
        [1084, '1084: PRE: Presubiculum'],
        [1085, '1085: MOs6b: Secondary motor area, layer 6b'],
        [1086, '1086: SSp-tr4: Primary somatosensory area, trunk, layer 4'],
        [1088, '1088: MGm: Medial geniculate complex, medial part'],
        [1089, '1089: HPF: Hippocampal formation'],
        [1090, '1090: SSs5: Supplemental somatosensory area, layer 5'],
        [1091, '1091: CUL4, 5: Lobules IV-V'],
        [1092, '1092: em: external medullary lamina of the thalamus'],
        [1093, '1093: PRNc: Pontine reticular nucleus, caudal part'],
        [1094, '1094: SSp-ll4: Primary somatosensory area, lower limb, layer 4'],
        [1096, '1096: AMd: Anteromedial nucleus, dorsal part'],
        [1097, '1097: HY: Hypothalamus'],
        [1098, '1098: MDRNd: Medullary reticular nucleus, dorsal part'],
        [1101, '1101: AId5: Agranular insular area, dorsal part, layer 5'],
        [1102, '1102: SSp-m6a: Primary somatosensory area, mouth, layer 6a'],
        [1104, '1104: AMv: Anteromedial nucleus, ventral part'],
        [1105, '1105: IA: Intercalated amygdalar nucleus'],
        [1106, '1106: VISC2/3: Visceral area, layer 2/3'],
        [1107, '1107: MDRNv: Medullary reticular nucleus, ventral part'],
        [1108, '1108: ccg: genu of corpus callosum'],
        [1109, '1109: PS: Parastrial nucleus'],
        [1111, '1111: SSp-tr5: Primary somatosensory area, trunk, layer 5'],
        [1113, '1113: IAD: Interanterodorsal nucleus of the thalamus'],
        [1114, '1114: VISal4: Anterolateral visual area, layer 4'],
        [1116, '1116: gVIIn: genu of the facial nerve'],
        [1120, '1120: IAM: Interanteromedial nucleus of the thalamus'],
        [1121, '1121: ENTl1: Entorhinal area, lateral part, layer 1'],
        [1123, '1123: icp: inferior cerebellar peduncle'],
        [1125, '1125: ORBvl5: Orbital area, ventrolateral part, layer 5'],
        [1126, '1126: TMd: Tuberomammillary nucleus, dorsal part'],
        [1127, '1127: TEa2/3: Temporal association areas, layer 2/3'],
        [1128, '1128: SSp-ll5: Primary somatosensory area, lower limb, layer 5'],
        [1134, '1134: DEC6b: Declive (VI), subdivision B'],
        [1139, '1139: NLOT3: Nucleus of the lateral olfactory tract, layer 3'],
        [10671, '10671: ME: Median eminence'],
        [10703, '10703: DG-mo: Dentate gyrus, molecular layer'],
        [10704, '10704: DG-po: Dentate gyrus, polymorph layer'],
        [12345, '12345: PDTg: Posterodorsal tegmental nucleus'],
        [12346, '12346: Pa5: Paratrigeminal nucleus'],
        [12347, '12347: VeCB: Vestibulocerebellar nucleus'],
        [182305696, '182305696: SSp-un1: Primary somatosensory area, unassigned, layer 1,2,3'],
        [182305712, '182305712: SSp-un4: Primary somatosensory area, unassigned, layer 4,5,6'],
        [312782592, '312782592: VISrl2/3: Rostrolateral area, layer 2/3'],
        [312782624, '312782624: VISrl6b: Rostrolateral area, layer 6b'],
        [312782656, '312782656: VISpor5: Postrhinal area, layer 5'],
        [484682496, '484682496: ProSv-m: Prosubiculum, ventral part, molecular layer'],
        [484682528, '484682528: stc: commissural branch of stria terminalis'],
        [496345664, '496345664: LGd-sh: Dorsal part of the lateral geniculate complex, shell'],
        [526322272, '526322272: FRP6a: Frontal pole, layer 6a'],
        [563807424, '563807424: PoT: Posterior triangular thalamic nucleus'],
        [599626944, '599626944: SCO: Subcommissural organ'],
        [606826688, '606826688: Pa4: Paratrochlear nucleus'],
        [614454272, '614454272: Su3: Supraoculomotor periaqueductal gray']
    ]);

}