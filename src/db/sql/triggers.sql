CREATE TRIGGER IF NOT EXISTS update_platform_counts_insert
AFTER INSERT ON games
BEGIN
    UPDATE platforms 
    SET 
        releasedGamesCount = releasedGamesCount + 1,
        collectionGamesCount = collectionGamesCount + 
            CASE WHEN NEW.inCollection = 1 THEN 1 ELSE 0 END
    WHERE id = NEW.platformId;
END;

CREATE TRIGGER IF NOT EXISTS update_platform_counts_delete
AFTER DELETE ON games
BEGIN
    UPDATE platforms 
    SET 
        releasedGamesCount = releasedGamesCount - 1,
        collectionGamesCount = collectionGamesCount - 
            CASE WHEN OLD.inCollection = 1 THEN 1 ELSE 0 END
    WHERE id = OLD.platformId;
END;

CREATE TRIGGER IF NOT EXISTS update_platform_counts_update
AFTER UPDATE ON games
WHEN OLD.platformId != NEW.platformId OR OLD.inCollection != NEW.inCollection
BEGIN
    UPDATE platforms 
    SET 
        releasedGamesCount = releasedGamesCount - 1,
        collectionGamesCount = collectionGamesCount - 
            CASE WHEN OLD.inCollection = 1 THEN 1 ELSE 0 END
    WHERE id = OLD.platformId;
    
    UPDATE platforms 
    SET 
        releasedGamesCount = releasedGamesCount + 1,
        collectionGamesCount = collectionGamesCount + 
            CASE WHEN NEW.inCollection = 1 THEN 1 ELSE 0 END
    WHERE id = NEW.platformId;
END;

CREATE TRIGGER IF NOT EXISTS update_gamelist_games_count_insert
AFTER INSERT ON game_lists
BEGIN
    UPDATE game_lists 
    SET gamesCount = (
        SELECT COUNT(*) 
        FROM json_each(NEW.content)
    )
    WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_gamelist_games_count_update
AFTER UPDATE ON game_lists
WHEN OLD.content != NEW.content
BEGIN
    UPDATE game_lists 
    SET gamesCount = (
        SELECT COUNT(*) 
        FROM json_each(NEW.content)
    )
    WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_gamelist_found_games_count_insert
AFTER INSERT ON game_lists
BEGIN
    UPDATE game_lists 
    SET foundGamesCount = (
        SELECT COUNT(*) 
        FROM json_each(NEW.content)
        WHERE json_extract(value, '$.releasedGameId') IS NOT NULL 
        AND json_extract(value, '$.releasedGameId') != ''
    )
    WHERE id = NEW.id;
END;