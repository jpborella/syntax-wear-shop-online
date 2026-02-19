import styles from './Gallery.module.css';
import { Button } from '../Button';
import galeriaHomem from '../../assets/images/galeria-homem.jpg';
import galeriaTenisRoxo from '../../assets/images/galeria-tenis-roxo.jpg';
import galeriaModelo from '../../assets/images/galeria-modelo.jpg';
import galeriaTenisColorido from '../../assets/images/galeria-tenis-colorido.jpg';
import galeriaTenisBrancoPreto from '../../assets/images/galeria-tenis-branco-e-preto.jpg';
import galeriaTenisCinza from '../../assets/images/galeria-tenis-cinza.jpg';

export const Gallery = () => {
    return (
        <div className="container mx-auto px-4 md:px-0">
            <section className={styles.galleryGrid}>
                <div className={styles.itemHighlight}>
                    <img src={galeriaHomem} alt="Krypton One" className={styles.image} />
                    <div className={styles.overlay}>
                        <h3 className="font-ubuntu text-base md:text-xl font-medium tracking-wider mb-2">Krypton One</h3>
                        <h2 className="font-ubuntu text-2xl md:text-4xl font-bold leading-tight mb-6 md:mb-10 px-4">Estilo urbano com atitude</h2>
                        <div className={styles.buttonGroup}>
                            <Button variant="secondary" size="md">Feminino</Button>
                            <Button variant="secondary" size="md">Masculino</Button>
                        </div>
                    </div>
                </div>

                <div className={styles.itemSneakerWhite}>
                    <img src={galeriaTenisBrancoPreto} alt="Tênis Branco e Preto" className={styles.image} />
                </div>

                <div className={styles.itemModel}>
                    <img src={galeriaModelo} alt="Modelo" className={styles.image} />
                </div>

                <div className={styles.itemSneakerColor}>
                    <img src={galeriaTenisColorido} alt="Tênis Colorido" className={styles.image} />
                </div>

                <div className={styles.itemSneakerSilver}>
                    <img src={galeriaTenisCinza} alt="Tênis Cinza" className={styles.image} />
                </div>

                <div className={styles.itemSneakerPurple}>
                    <img src={galeriaTenisRoxo} alt="Tênis Roxo" className={styles.image} />
                </div>
            </section>
        </div>
    );
};