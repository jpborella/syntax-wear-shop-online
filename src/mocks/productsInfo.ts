import MensTreeDasher from '@/assets/images/tree-dasher-2-natural-black-boyal-blue.webp'
import MensTreeRunnerNz from '@/assets/images/tree-runner-nz-weathered-brown.webp'
import MensWoolCruiser from '@/assets/images/wool-cruiser-burgundy.webp'
import MensWoolCruiserSlipOn from '@/assets/images/wool-cruiser-slip-on-dark-grey.webp'
import MensWoolCruiserWaterproof from '@/assets/images/wool-cruiser-waterproof-natural-black.webp'
import MensWoolRunnerNzWaterproof from '@/assets/images/wool-runner-nz-waterproof-medium-grey.webp'
import MensWoolRunnerNzMidWaterproof from '@/assets/images/wool-runner-nz-mid-waterproof-natural-black.webp'
import MensStriderExplore from '@/assets/images/strider-explore-rustic-green.webp'
import MensCruiserMidExplore from '@/assets/images/cruiser-mid-explore-rustic-green.webp'
import MensCruiser from '@/assets/images/cruiser_blizzard_blizzard.webp'

export const products = [
    {
        id: 1,
        name: 'Mens tree dasher 2',
        images: [MensTreeDasher],
        price: 135,
        colors: ['Natural Black/Royal blue'],
        description: 'Tênis de performance feito em tecido respirável de fibra de árvore, com ótimo amortecimento e suporte. Ideal para treinos e uso diário, oferecendo conforto e estilo moderno.',
        categoryId: 1,
        slug: 'mens-tree-dasher-2',
        stock: 15,
        active: true,
        color: 'Natural Black/Royal blue'
    },
    {
        id: 2,
        name: 'Mens tree runner nz',
        images: [MensTreeRunnerNz],
        price: 110,
        colors: ['Weathered Brown'],
        description: 'Tênis leve e confortável produzido com tecido natural de eucalipto. Possui maciez no toque, respirabilidade e design versátil para acompanhar qualquer look casual.',
        categoryId: 1,
        slug: 'mens-tree-runner-nz',
        stock: 12,
        active: true,
        color: 'Weathered Brown'
    },
    {
        id: 3,
        name: 'Mens wool cruiser',
        images: [MensWoolCruiser],
        price: 100,
        colors: ['Burgundy'],
        description: 'Sapato feito com lã merino macia que mantém os pés aquecidos e confortáveis. Estiloso, resistente e perfeito para dias frios sem abrir mão do visual moderno.',
        categoryId: 1,
        slug: 'mens-wool-cruiser',
        stock: 20,
        active: true,
        color: 'Burgundy'
    },
    {
        id: 4,
        name: 'Mens wool cruiser slip on',
        images: [MensWoolCruiserSlipOn],
        price: 95,
        colors: ['Dark Grey'],
        description: 'Modelo slip-on em lã merino, fácil de calçar e extremamente confortável. Ideal para quem busca praticidade, estilo discreto e aquecimento natural.',
        categoryId: 1,
        slug: 'mens-wool-cruiser-slip-on',
        stock: 18,
        active: true,
        color: 'Dark Grey'
    },
    {
        id: 5,
        name: 'Mens wool cruiser waterproof',
        images: [MensWoolCruiserWaterproof],
        price: 140,
        colors: ['Natural Black'],
        description: 'Versão impermeável do Wool Cruiser, feita com lã merino tratada. Mantém os pés secos e aquecidos mesmo em dias chuvosos, sem perder o conforto e o estilo.',
        categoryId: 1,
        slug: 'mens-wool-cruiser-waterproof',
        stock: 10,
        active: true,
        color: 'Natural Black'
    },
    {
        id: 6,
        name: 'Mens wool runner nz waterproof',
        images: [MensWoolRunnerNzWaterproof],
        price: 150,
        colors: ['Medium Grey'],
        description: 'Tênis resistente à água, feito em lã merino com ajuste confortável e respirável. Perfeito para quem busca proteção e estilo em qualquer clima.',
        categoryId: 5,
        slug: 'mens-wool-runner-nz-waterproof',
        stock: 8,
        active: true,
        color: 'Medium Grey'
    },
    {
        id: 7,
        name: 'Mens wool runner nz mid waterproof',
        images: [MensWoolRunnerNzMidWaterproof],
        price: 160,
        colors: ['Natural Black'],
        description: 'Modelo de cano médio em lã merino, impermeável e elegante. Oferece estabilidade extra, conforto térmico e proteção ideal para dias frios e úmidos.',
        categoryId: 5,
        slug: 'mens-wool-runner-nz-mid-waterproof',
        stock: 6,
        active: true,
        color: 'Natural Black'
    },
    {
        id: 8,
        name: 'Mens strider explore',
        images: [MensStriderExplore],
        price: 130,
        colors: ['Rustic Green'],
        description: 'Tênis robusto e moderno, feito para aventuras urbanas e ao ar livre. Combina resistência, conforto e design em um só produto versátil.',
        categoryId: 5,
        slug: 'mens-strider-explore',
        stock: 14,
        active: true,
        color: 'Rustic Green'
    },
    {
        id: 9,
        name: 'Mens cruiser mid explore',
        images: [MensCruiserMidExplore],
        price: 140,
        colors: ['Rustic Green'],
        description: 'Sapato de cano médio com acabamento resistente e estilo aventureiro. Proporciona conforto prolongado e segurança em diferentes tipos de terreno.',
        categoryId: 3,
        slug: 'mens-cruiser-mid-explore',
        stock: 9,
        active: true,
        color: 'Rustic Green'
    },
    {
        id: 10,
        name: 'Mens cruiser',
        images: [MensCruiser],
        price: 100,
        colors: ['Blizzard'],
        description: 'Clássico e elegante, o Cruiser é feito em materiais premium que garantem conforto e durabilidade. Uma escolha versátil para qualquer ocasião.',
        categoryId: 3,
        slug: 'mens-cruiser',
        stock: 22,
        active: true,
        color: 'Blizzard'
    },
]
