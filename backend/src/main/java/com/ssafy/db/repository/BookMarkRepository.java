package com.ssafy.db.repository;

import com.ssafy.db.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookMarkRepository extends JpaRepository<Bookmark, BookmarkId> {
    List<Bookmark> findByUser(User user);
}