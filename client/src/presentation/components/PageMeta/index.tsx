import { SeoProps } from '@/presentation/types';
import { Helmet } from 'react-helmet-async';

export const PageMeta = ({
    title = 'App',
    description = 'Description',
    keywords = 'Keywords',
    image = '/vite.svg',
    url = window.location.href,
}: SeoProps) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
        </Helmet>
    );
};
